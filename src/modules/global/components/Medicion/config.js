import React from 'react';

export const ZOOM_OVER = 'ZOOM_OVER',
    DELETE = 'DELETE';

export const actionsDef = [
    {
        id: ZOOM_OVER,
        title: "Zoom",
        icon: "fas fa-expand"
    }, {
        id: DELETE,
        title: "Eliminar",
        icon: "fas fa-trash"
    }
];

export const defaultColDef = {
    suppressMenu: true
}

export const columnDefs = [
    {
        headerName: "",
        field: "",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        width: 38,
        minWidth: 38,
        maxWidth: 38
    },
    {
        headerName: "N°",
        field: "id",
        width: 40,
        minWidth: 40,
        valueGetter: (params) => {
            return params.data.id;
        }
    },
    {
        headerName: "Medida",
        field: "medida",
        width: 100,
        minWidth: 100
    },
    {
        headerName: "Dibujo",
        width: 70,
        minWidth: 70,
        cellRendererFramework: (params) => {
            return <i className={params.data.icon}></i>;
        },
        cellClass: 'text-md-center'
    }
];