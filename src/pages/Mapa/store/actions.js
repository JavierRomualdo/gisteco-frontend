import Tarea from "./tareas/Tarea";

/*
    Los siguientes valores son los que pueden tomar
    el atributo 'class' de una acción.

    la propiedad 'class' señala la clase de acción
    que se ha ejecutado,
    pudiendo ser:

        'SIDEBAR_ACTION': si la acción ejecutada
        correponde a una acción que incide en el estado
        del sidebar

        'INTERACION_ACTION': si la acción ejecutada
        es una que está relacionada con alguna de las interacciones
        de 'dibujo' o 'selección'

        'TAREAS_ACTION': si la acción ejecutada
        corresponde a una acción que incide en el
        estado y contenido de las tareas.        
    
 */
export const SIDEBAR_ACTION = 'SIDEBAR_ACTION',
    INTERACION_ACTION = 'INTERACION_ACTION',
    TAREAS_ACTION = 'TAREAS_ACTION',
    FILTRO_AVANZADO_ACTION = 'FILTRO_AVANZADO_ACTION',
    STREET_VIEW_ACTION = 'STREET_VIEW_ACTION';

/** Relativo a seleccion y dibujo */

export const ASIGNAR_CONTROL_DIBUJO = 'ASIGNAR_CONTROL_DIBUJO',
    LIBERAR_CONTROL_DIBUJO = 'LIBERAR_CONTROL_DIBUJO',
    ASIGNAR_CONTROL_SELECTOR = 'ASIGNAR_CONTROL_SELECTOR',
    LIBERAR_CONTROL_SELECTOR = 'LIBERAR_CONTROL_SELECTOR';

export const asignarControlDibujo = (tarea) => ({ class: INTERACION_ACTION, type: ASIGNAR_CONTROL_DIBUJO, tarea });
export const liberarControlDibujo = () => ({ class: INTERACION_ACTION, type: LIBERAR_CONTROL_DIBUJO })
export const asignarControlSelector = (tarea) => ({ class: INTERACION_ACTION, type: ASIGNAR_CONTROL_SELECTOR, tarea });
export const liberarControlSelector = () => ({ class: INTERACION_ACTION, type: LIBERAR_CONTROL_SELECTOR });

/* Relativo a sidebar */

export const CERRAR_SIDEBAR = 'CERRAR_SIDEBAR',
    ABRIR_SIDEBAR = 'ABRIR_SIDEBAR',
    REDIMENSIONAR_SIDEBAR = 'REDIMENSIONAR_SIDEBAR',
    TOGGLE_MENU_SIDEBAR = 'TOGGLE_MENU_SIDEBAR';

export const cerrarSidebar = () => ({ class: SIDEBAR_ACTION, type: CERRAR_SIDEBAR });
export const abrirSidebar = (idTab) => ({ class: SIDEBAR_ACTION, type: ABRIR_SIDEBAR, idTab });
export const redimensionarSidebar = () => ({ class: SIDEBAR_ACTION, type: REDIMENSIONAR_SIDEBAR });
export const toggleMenuSidebar = (idTab) => ({ class: SIDEBAR_ACTION, type: TOGGLE_MENU_SIDEBAR, idTab });

/* Relativo a tareas */

export const ABRIR_TAREA = 'ABRIR_TAREA',
    CAMBIAR_A_TAREA = 'CAMBIAR_A_TAREA',
    CERRAR_TAREA = 'CERRAR_TAREA',
    CERRAR_TODAS_LAS_TAREAS = 'CERRAR_TODAS_LAS_TAREAS',
    CERRAR_OTRAS_TAREAS = 'CERRAR_OTRAS_TAREAS';

export const abrirTarea = ({ componenteId, titulo, props, reload = false }) => {
    const tarea = new Tarea(componenteId, titulo, props);
    return { class: TAREAS_ACTION, type: ABRIR_TAREA, tarea, reload };
};
export const cambiarATarea = (idTarea) => ({ class: TAREAS_ACTION, type: CAMBIAR_A_TAREA, idTarea });
export const cerrarTarea = (idTarea) => ({ class: TAREAS_ACTION, type: CERRAR_TAREA, idTarea });
export const cerrarTodasLasTareas = () => ({ class: TAREAS_ACTION, type: CERRAR_TODAS_LAS_TAREAS });
export const cerrarOtrasTareas = (idTarea) => ({ class: TAREAS_ACTION, type: CERRAR_OTRAS_TAREAS, idTarea });

/** Relativo a filtros avanzados */
export const CAMBIAR_VALOR_PARAM_FILTRO = 'CAMBIAR_VALOR_PARAM_FILTRO';

export const cambiarValorParamFiltro = (capa, params) => ({ class: FILTRO_AVANZADO_ACTION, type: CAMBIAR_VALOR_PARAM_FILTRO, capa, params })

/** Relativo a StreetView */
export const CAMBIAR_STREET_VIEW_OPTIONS = 'CAMBIAR_STREET_VIEW_OPTIONS';

export const cambiarStreetViewPanoramaOptions = (StreetViewPanoramaOptions) => ({ class: STREET_VIEW_ACTION, type: CAMBIAR_STREET_VIEW_OPTIONS, StreetViewPanoramaOptions });