import { transform } from "ol/proj";

export const BAR_MENU_ACTION = {
    ZOOM: "ZOOM",
    DELETE: "DEL"
}

export const columnDefs = (map) => [
    {
        headerName: "Coordenada",
        valueGetter: (params) => {
            const crs = params.data.sistema;
            const coord = transform(params.data.coordenadas, map.codeProjection, crs).map(c => c.toFixed(6));
            return coord.join(", ");
        }
    },
    {
        headerName: "Sistema",
        field: "sistema",
        editable: true,
        cellEditor: "agRichSelectCellEditor",
        cellEditorParams: {
            values: ["EPSG:32717", "EPSG:3857", "EPSG:4326"]
        }
    }
];

export const actionsDef = [
    {
        id: BAR_MENU_ACTION.ZOOM,
        title: "Zoom",
        icon: "fas fa-search-location"

    },
    {
        id: BAR_MENU_ACTION.DELETE,
        title: "Zoom",
        icon: "fas fa-trash"
    }
];

export const formatFeatures = (fts) => fts.map((ft, id) => {
    const coordenadas = ft.getGeometry().getCoordinates(),
        sistema = ft.get('display_crs');
    return { id, coordenadas, sistema, ft };
})