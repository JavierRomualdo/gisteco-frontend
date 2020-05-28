export const LABEL_HISTORICO_CONTROL_CALIDAD = 'Histórico control calidad';
export const LABEL_LISTADO_HISTORICO_CONTROL_CALIDAD = 'Listado histórico control calidad';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 300px)';
// Mensjaes
export const MSJ_NO_HAY_HISTORIAL = 'No hay historial control calidad';
// GENERAR COLUMNAS TABLA: AG-GRID
export const generarColumnasPaHistoricoControlCalidad = ()=> [
    {
        headerName: "Fuente",
        field: "tipo_fuente",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Código",
        field: "gid",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "Fecha registro",
        field: "fecha_registro",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "Parámetro",
        field: "parametro",
        width: 100,
        minWidth: 100,
    },
    {
        headerName: "Valor",
        field: "valor",
        width: 120,
        minWidth: 120,
    }
];