// LABEL
export const LABEL_LISTADO_FACTURACION_SUMINISTRO = 'Facturación suministro';
export const LABEL_LISTADO_LECTURA_SUMINISTRO = 'Lecturas suministro';
export const MSJ_NO_HAY_FACTURACIONES = 'No hay facturaciones';
export const MSJ_NO_HAY_LECTURAS = 'No hay lecturas';
export const MSH_NO_HAY_CONSUMOS = 'No hay consumos';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 315px)';
export const LABEL_USUARIO = 'Usuario';
// GENERAR COLUMNAS TABLA: AG-GRID
export const generarColumnasPaFacturacionSuministro = ()=> [
    {
        headerName: "Código recibo",
        field: "codigo_recibo",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Fecha emisión",
        field: "fecha_emision",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "Fecha vencimiento",
        field: "fecha_vencimiento",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "Fecha pago",
        field: "fecha_pago",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "Total",
        field: "total_pendiente",
        width: 100,
        minWidth: 100,
    },
    {
        headerName: "Volumen facturado",
        field: "volumen_facturado",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Estado recibo",
        field: "estado_recibo",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Meses atrasados",
        field: "meses_atrasados",
        width: 120,
        minWidth: 120,
    }
];

export const generarColumnasPaLecturas = ()=> [
    {
        headerName: "Medidor",
        field: "id_medidor",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Periodo",
        field: "periodo",
        width: 130,
        minWidth: 130,
    },
    {
        headerName: "Lectura diámetro mayor",
        field: "lectura_diametro_mayor",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "Lectura diámetro menor",
        field: "lectura_diametro_menor",
        width: 140,
        minWidth: 140,
    },
    {
        headerName: "Tipo lectura",
        field: "tipo_lectura",
        width: 100,
        minWidth: 100,
    },
    {
        headerName: "Criticada",
        field: "lectura_criticada",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha lectura",
        field: "fecha_lectura",
        width: 120,
        minWidth: 120,
    }
];