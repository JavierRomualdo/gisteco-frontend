import {
    ASIGNAR_CONTROL_DIBUJO,
    ASIGNAR_CONTROL_SELECTOR,
    LIBERAR_CONTROL_DIBUJO,
    LIBERAR_CONTROL_SELECTOR
} from "../actions";
import {
    DRAWING,
    SELECTION
} from "../config";

export default (state, action) => {
    switch (action.type) {
        case ASIGNAR_CONTROL_DIBUJO:
            return { ...state, tareaDibujo: action.tarea, estado: DRAWING, tareaSeleccion: "" };
        case ASIGNAR_CONTROL_SELECTOR:
            return { ...state, tareaSeleccion: action.tarea, estado: SELECTION, tareaDibujo: "" };
        case LIBERAR_CONTROL_DIBUJO:
            return { ...state, tareaDibujo: "", tareaSeleccion: "", estado: "" };
        case LIBERAR_CONTROL_SELECTOR:
            return { ...state, tareaDibujo: "", tareaSeleccion: "", estado: "" };
        default:
            return state;
    }
}