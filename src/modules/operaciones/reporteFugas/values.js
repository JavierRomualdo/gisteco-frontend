

export const MSJ_NO_HAY_REPORTE_FUGAS = 'No hay reporte fugas';
export const LABEL_LISTADO_FUGAS = 'Listado de fugas';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 510px)';

export const columnDefs = [
        {
            headerName: "ID",
            field: "id",
            width: 60,
            minWidth: 60
        },
        {
            headerName: "Lugar de la fuga",
            field: "lugar_fuga",
            width: 150,
            minWidth: 150
        },
        {
            headerName: "Descripción",
            field: "descripcion",
            width: 290,
            minWidth: 290
        },
        {
            headerName: "Referencia ubicación",
            field: "referencia_ubicacion",
            width: 400,
            minWidth: 400
        },
        {
            headerName: "Provincia",
            field: "provincia",
            width: 130,
            minWidth: 130
        },
        {
            headerName: "Distrito",
            field: "distrito",
            width: 130,
            minWidth: 130
        },
        {
            headerName: "Fecha inicio de la fuga",
            field: "fecha_inicio",
            width: 160,
            minWidth: 160
        },
        {
            headerName: "Fecha solución de la fuga",
            field: "fecha_solucion",
            width: 160,
            minWidth: 160
        },
        {
            headerName: "Código del elemento afectado",
            field: "codigo_elemento_afectado",
            width: 100,
            minWidth: 100
        },
        {
            headerName: "Diámetro (mm)",
            field: "diametro_tuberia",
            width: 120,
            minWidth: 120
        },
        {
            headerName: "Volumen perdido",
            field: "volumen_perdido_agua",
            width: 120,
            minWidth: 120
        }
    ];