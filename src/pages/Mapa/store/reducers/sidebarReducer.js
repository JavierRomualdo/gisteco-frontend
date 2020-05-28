import {
    ABRIR_SIDEBAR,
    CERRAR_SIDEBAR,
    REDIMENSIONAR_SIDEBAR,
    TOGGLE_MENU_SIDEBAR
} from "../actions";

export default (state, action) => {
    switch (action.type) {
        case ABRIR_SIDEBAR:
            return { ...state, sidebarAbierto: true, idTabActivo: action.idTab };
        case CERRAR_SIDEBAR:
            return { ...state, sidebarAbierto: false };
        case REDIMENSIONAR_SIDEBAR:
            if (state.idTabActivo === 'STREET_VIEW') return state;
            return { ...state, sidebarMaximizado: !state.sidebarMaximizado };
        case TOGGLE_MENU_SIDEBAR:

            const sidebarAbierto = !(state.sidebarAbierto && state.idTabActivo === action.idTab);

            return {
                ...state, sidebarAbierto,
                idTabActivo: action.idTab
            };
        default:
            return state;
    }
}