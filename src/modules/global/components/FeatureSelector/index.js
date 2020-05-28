import { useCallback, useState, useEffect } from 'react';
import { withStore } from '../../../../pages/Mapa/store/Store';
import { SELECTION } from '../../../../pages/Mapa/store/config';

const initialState = {
    onProgress: false,
    error: null
};

const useFeatureSelection = (storeContext, tarea, options = {}) => {

    const [state, setState] = useState(initialState);
    const { store, map, interactionApi, sidebarApi } = storeContext;
    const { layerFilter, onFeatureSelected } = options;
    const onSelection = store.estado === SELECTION,
        tareaEstaActiva = store.tareaSeleccion === tarea,
        tareaEsIdentificacion = tarea === 'IDENTIFICACION';

    /** finish */

    const finish = useCallback(() => {
        interactionApi.liberarControlSelector();
    }, [interactionApi]);

    /**
     * Single click listener
     */

    const singleClickListener = useCallback((e) => {
        const capaSeleccionada = map.forEachLayerAtPixel(e.pixel, layer => layer, { layerFilter });

        if (capaSeleccionada) {

            capaSeleccionada.getFeaturesAtCoordinate(e.coordinate, map, null, {
                dataProjection: 'EPSG:32717',
                featureProjection: map.codeProjection
            })
                .then(fts => {
                    const [ft] = fts;
                    if (ft) {
                        ft.set('capa', capaSeleccionada);
                        map.agregarASeleccionados(fts, true);
                        if (tareaEsIdentificacion) {
                            sidebarApi.abrirSidebar('INFORMACION');
                        }
                        onFeatureSelected && onFeatureSelected.call(null, ft, finish);
                    }
                }).catch(error => setState({ onProgress: false, error }));

        } else {
            map.seleccion.getSource().clear();
        }
    }, [map, sidebarApi, finish,/* (cambian)*/ layerFilter, tareaEsIdentificacion, onFeatureSelected]);

    /**
     * PointerMove listener
     */

    const pointerMoveListener = useCallback((e) => {
        if (e.dragging) return;
        const capaSeleccionada = map.forEachLayerAtPixel(e.pixel, layer => layer, { layerFilter });
        map.getTargetElement().style.cursor = capaSeleccionada ? 'pointer' : '';
    }, [map, /* (cambian)*/layerFilter]);


    const start = useCallback(() => {
        interactionApi.asignarControlSelector(tarea);
    }, [interactionApi, tarea]);



    useEffect(() => {
        if (tareaEstaActiva && onSelection) {
            map.on('singleclick', singleClickListener);
            map.on('pointermove', pointerMoveListener);
            setState({ onProgress: true, error: null });
        }
        return () => {
            map.un('singleclick', singleClickListener);
            map.un('pointermove', pointerMoveListener);
            if (map.getTargetElement()) {
                map.getTargetElement().style.cursor = 'auto';
            }
            setState({ onProgress: false, error: null });
        }
    }, [map, tarea, /* (cambian)*/ pointerMoveListener, singleClickListener, tareaEstaActiva, onSelection]);

    return { start, finish, state }
};


export default withStore(({
    storeContext,
    tarea,
    children,
    ...restProps
}) => {
    const { start, finish, state } = useFeatureSelection(storeContext, tarea, restProps);
    return children(start, finish, state);
})