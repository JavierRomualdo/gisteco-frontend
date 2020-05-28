export const crearMenuContextual = (idTarea, tareasApi) => {
    return [
        {
            label: 'Cerrar',
            icon: 'fas fa-times',
            command: () => {
                tareasApi.cerrarTarea(idTarea);
            }
        },
        {
            label: 'Cerrar los demás',
            icon: 'fas fa-times',
            command: () => {
                tareasApi.cerrarOtrasTareas(idTarea);
            }
        },
        {
            label: 'Cerrar todos',
            icon: 'fas fa-times',
            command: () => {
                tareasApi.cerrarTodasLasTareas();
            }
        }
    ];
}