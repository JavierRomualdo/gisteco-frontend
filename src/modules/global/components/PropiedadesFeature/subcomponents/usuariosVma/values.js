// LABEL
export const LABEL_LISTADO_FACTURACION_SUMINISTRO = 'Facturación suministro';
export const LABEL_LISTADO_LECTURA_SUMINISTRO = 'Lecturas suministro';
export const LABEL_LISTADO_INSPECCIONES_VMA_SUMINISTRO = 'Inspecciones vma suministro ';
export const MSJ_NO_HAY_FACTURACIONES = 'No hay facturaciones';
export const MSJ_NO_HAY_LECTURAS = 'No hay lecturas';
export const MSJ_NO_HAY_INSPECCIONES = 'No hay inspecciones';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 315px)';
export const LABEL_USUARIO = 'Usuario';
// GENERAR COLUMNAS TABLA: AG-GRID
export const generarColumnasPaInspeccionesVma = ()=> [
    {
        headerName: "Fecha",
        width: 150,
        minWidth: 150,
        valueGetter: (params) => {
            return `${params.data.fecha_inspeccion} ${params.data.hora_inspeccion}`;
        }
    },
    {
        headerName: "dbo",
        field: "dbo",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "dqo",
        field: "dqo",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "sst",
        field: "sst",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "ayg",
        field: "ayg",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Estado",
        field: "estado_inspeccion",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Factor de ajuste",
        field: "factor_ajuste_inspeccion",
        width: 120,
        minWidth: 120,
    }
];