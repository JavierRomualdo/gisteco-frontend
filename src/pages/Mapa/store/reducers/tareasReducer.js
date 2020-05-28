import {
    ABRIR_TAREA,
    CAMBIAR_A_TAREA,
    CERRAR_TAREA,
    CERRAR_TODAS_LAS_TAREAS,
    CERRAR_OTRAS_TAREAS
} from "../actions";

export default (state, action) => {
    switch (action.type) {
        case ABRIR_TAREA:
            const { tarea, reload } = action;
            const existe = state.tareas.findIndex(t => t.id === tarea.id) !== -1;
            if (!existe) {
                const tareas = state.tareas.concat(tarea);
                return { ...state, tareas, idTareaActual: tarea.id };
            }
            if (reload) {
                const tareas = state.tareas.map(t => {
                    if (t.id === tarea.id) return tarea;
                    return t;
                });
                return { ...state, tareas, idTareaActual: tarea.id };
            }
            return { ...state, idTareaActual: tarea.id };
        case CAMBIAR_A_TAREA:
            return { ...state, idTareaActual: action.idTarea };
        case CERRAR_TAREA:
            const nuevoState = { ...state, tareas: state.tareas.filter(t => t.id !== action.idTarea) };
            if (state.idTareaActual === action.idTarea) {
                const tareasAntiguas = state.tareas;
                const indice = tareasAntiguas.findIndex(t => t.id === action.idTarea);
                const nuevaTareaActual = tareasAntiguas[indice - 1] || tareasAntiguas[indice + 1] || null;
                const idTareaActual = nuevaTareaActual ? nuevaTareaActual.id : '';
                return { ...nuevoState, idTareaActual };
            } else { return nuevoState; }
        case CERRAR_TODAS_LAS_TAREAS:
            return { ...state, tareas: [], idTareaActual: '' }
        case CERRAR_OTRAS_TAREAS:
            return {
                ...state,
                tareas: state.tareas.filter(t => t.id === action.idTarea),
                idTareaActual: action.idTarea
            };
        default:
            return state;
    }
}