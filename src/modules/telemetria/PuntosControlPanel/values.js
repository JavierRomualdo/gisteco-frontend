export const defaultColDef = {
    suppressMenu: true
}

export const columnDefs = [
    {
        headerName: "Punto",
        field: "nombre",
        sortable: true,
        suppressMenu: true
    },
    {
        headerName: "Código",
        field: "codigo"
    }
];

export const VER_EN_MAPA_ACTION = 'VER_EN_MAPA_ACTION',
    VER_LECTURAS_ACTION = 'VER_LECTURAS_ACTION';


export const actionsDef = [
    {
        id: VER_LECTURAS_ACTION,
        title: "Lecturas",
        icon: "far fa-chart-bar"
    },
    {
        id: VER_EN_MAPA_ACTION,
        title: "Ir a ubicación",
        icon: "fas fa-map-marker-alt"
    }
];