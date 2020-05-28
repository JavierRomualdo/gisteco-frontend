import { useCallback, useState, useEffect } from 'react';
import { withStore } from '../../../../pages/Mapa/store/Store';
import { DRAWING } from '../../../../pages/Mapa/store/config';

const initialState = {
    active: false
}

/**
 * DrawOptions => DrawOptions from 'easyolmaps'
 */
const useFeatureDrawing = (storeContext, tarea, { onDrawEnd, ...drawOptions }) => {

    const [state, setState] = useState(initialState);
    const { store, map, interactionApi } = storeContext;
    const noDrawing = store.estado !== DRAWING,
        tareaHaCambiado = store.tareaDibujo !== tarea;

    useEffect(() => {
        if (noDrawing) {
            map.terminarDibujo(tarea);
            setState({ active: false });
        }
        else if (tareaHaCambiado) {
            setState({ active: false });
        }
    }, [map, noDrawing, tareaHaCambiado, tarea]);

    const finish = useCallback(() => {
        interactionApi.liberarControlDibujo();
    }, [interactionApi]);

    const start = useCallback((startOptions = {}) => {
        //console.log(`ready to start drawing for '${tarea}'`);
        /*
            options:{
                removePrevious: Boolean (should previous feature be deleted?)
            }
        */
        // what do we need before performing drawing?
        // a source

        const source = drawOptions.source;

        // check 'options' and perform actions if necessary         
        if (startOptions.removePrevious) {
            const fts = source.getFeatures();
            if (fts.length) source.removeFeature(fts[fts.length - 1]);
        }

        map.dibujar(tarea, drawOptions);
        map.drawer.on('drawend', (drawEvt) => {
            onDrawEnd && onDrawEnd.call(null, drawEvt, finish)
        });
        setState({ active: true });
    }, [map, finish, drawOptions, onDrawEnd, tarea]);

    return { start, finish, state }
}

export default withStore(({
    storeContext,
    tarea,
    onDrawEnd,
    children,
    ...drawOptions
}) => {
    const { start, finish, state } = useFeatureDrawing(storeContext, tarea, { onDrawEnd, ...drawOptions });
    return children(start, finish, state);
})