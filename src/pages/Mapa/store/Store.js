import React,
{
    createContext,
    useReducer,
    useState,
    forwardRef
} from 'react';
import reducer from './reducers';
import config from './config';
import {
    abrirSidebar,
    cerrarSidebar,
    redimensionarSidebar,
    toggleMenuSidebar,
    liberarControlDibujo,
    asignarControlDibujo,
    liberarControlSelector,
    asignarControlSelector,
    abrirTarea,
    cerrarTarea,
    cambiarATarea,
    cerrarTodasLasTareas,
    cerrarOtrasTareas,
    cambiarValorParamFiltro,
    cambiarStreetViewPanoramaOptions
} from './actions';
import { createMap } from './map/config';

const AppStore = createContext(null);
const latLong = [-80.637816, -5.188603];

const createApis = (dispatch) => {
    return {
        sidebarApi: {
            abrirSidebar: (idTab) => dispatch(abrirSidebar(idTab)),
            cerrarSidebar: () => dispatch(cerrarSidebar()),
            redimensionarSidebar: () => dispatch(redimensionarSidebar()),
            toggleMenuSidebar: (idTab) => dispatch(toggleMenuSidebar(idTab))
        },
        interactionApi: {
            liberarControlDibujo: () => dispatch(liberarControlDibujo()),
            asignarControlDibujo: (tarea) => dispatch(asignarControlDibujo(tarea)),
            liberarControlSelector: () => dispatch(liberarControlSelector()),
            asignarControlSelector: (tarea) => dispatch(asignarControlSelector(tarea))
        },
        tareasApi: {
            abrirTarea: (tareaProps) => {
                dispatch(abrirSidebar('TAREAS'));
                dispatch(abrirTarea(tareaProps));
            },
            cambiarATarea: (idTarea) => dispatch(cambiarATarea(idTarea)),
            cerrarTarea: (idTarea) => dispatch(cerrarTarea(idTarea)),
            cerrarTodasLasTareas: () => dispatch(cerrarTodasLasTareas()),
            cerrarOtrasTareas: (idTarea) => dispatch(cerrarOtrasTareas(idTarea))
        },
        filtroAvanzadoApi: {
            cambiarValorParamFiltro: (capaKey, params) => dispatch(cambiarValorParamFiltro(capaKey, params))
        },
        streetViewApi: {
            setOptions: (StreetViewPanoramaOptions) => dispatch(cambiarStreetViewPanoramaOptions(StreetViewPanoramaOptions))
        }
    }
}

export default ({ appData, children }) => {

    const [store, dispatch] = useReducer(reducer, config);
    const [apis] = useState(createApis(dispatch));
    const [map] = useState(createMap(latLong, appData.sistema.listaCapas, { store, ...apis }));

    return (
        <AppStore.Provider
            value={{ store, ...apis, map }}
        >
            {children}
        </AppStore.Provider>
    );
}

export const withStore = (component) => {
    const Component = component;

    return forwardRef((props, ref) => <AppStore.Consumer>
        {(store) => <Component storeContext={store} {...props} ref={ref} />}
    </AppStore.Consumer>)
}

export const mapStoreToProps = (component, defPropsFcn) => {
    const Component = component;

    return withStore((props) => {
        return (
            <Component
                {...defPropsFcn(props.storeContext)}
                {...props}
            />
        )
    });
}