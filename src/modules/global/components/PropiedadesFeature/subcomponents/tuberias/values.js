export const LABEL_HISTORIAL_MANTENIMIENTOS = 'Historial mantenimiento tubería alcantarillado';
export const LABEL_HISTORIAL_INCIDENCIAS = 'Historial de incidencias';
export const MSJ_NO_HAY_MANTENIMIENTOS = 'No hay mantinimientos';
export const MSJ_NO_HAY_INCIDENCIAS = 'No hay incidencias';

export const LABEL_TAMANIO_TABLA = 'calc(100vh - 300px)';

// GENERAR COLUMNAS TABLA: AG-GRID
export const generarColumnasPaHistorialMantenimientos = () => [
    {
        headerName: "Código orden",
        field: "codigo",
        width: 120,
        minWidth: 120
    },
    {
        headerName: "Acciones",
        // field: "acciones",
        width: 200,
        minWidth: 200,
        valueGetter: (params) => {
            const listaAcciones = params.data.acciones
            const acciones = listaAcciones.map(data => data.descripcion).join(", ");
            return acciones;
        }
    },
    {
        headerName: "Costo real",
        field: "costo_real",
        width: 100,
        minWidth: 100,
    },
    {
        headerName: "Costo proyectado",
        field: "costo_proyectado",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Dirección",
        field: "direccion",
        width: 150,
        minWidth: 150,
    },
    {
        headerName: "Comprobante",
        field: "tipo_comprobante",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Número comprobante",
        // field: "numero",
        width: 120,
        minWidth: 120,
        valueGetter: (params) => {
            return `${params.data.serie}-${params.data.numero}`;
        }
    },
    {
        headerName: "Estado",
        field: "estado",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha inicio",
        field: "fecha_inicio",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha fin",
        field: "fecha_fin",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Empresa ejecutora",
        field: "empresa",
        width: 130,
        minWidth: 130,
    }
];

export const generarColumnasPaHistorialIncidencias = () => [
    {
        headerName: "Tipo de incidencia",
        field: "tipo_incidencia",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Descripción",
        field: "descripcion",
        width: 180,
        minWidth: 180,
    },
    {
        headerName: "Referencia de ubicación",
        field: "referencia_ubicacion",
        width: 150,
        minWidth: 150,
    },
    {
        headerName: "Fecha incicio",
        field: "fecha_hora_incidencia",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Fecha control",
        field: "fecha_hora_solucion",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Tiempo transcurrido",
        field: "tiempo_transcurrido",
        width: 120,
        minWidth: 120,
    },
    {
        headerName: "Volumen perdido",
        field: "volumen_perdido_agua",
        width: 120,
        minWidth: 120,
    }
];