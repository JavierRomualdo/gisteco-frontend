import TareasClass from "./Tareas.class";

export function crearMenuContextual(idTarea) {
    return [
        {
            label: 'Cerrar',
            icon: 'fas fa-times',
            command: () => {
                TareasClass.api.cerrarTarea(idTarea);
            }
        },
        {
            label: 'Cerrar los demás',
            icon: 'fas fa-times',
            command: () => {
                TareasClass.api.cerrarOtrasTareas(idTarea);
            }
        },
        {
            label: 'Cerrar todos',
            icon: 'fas fa-times',
            command: () => {
                TareasClass.api.cerrarTodasLasTareas();
            }
        }
    ];
};