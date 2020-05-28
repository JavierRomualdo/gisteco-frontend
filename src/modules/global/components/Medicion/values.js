import React from 'react';

export const LABEL_INICIAR_MEDICION = 'Iniciar medición';
export const LABEL_FINALIZAR_MEDICION = 'Finalizar medición';
export const LABEL_INCIAR_FINALIZAR_MEDICION = '¿Iniciar o finalizar medición?';
export const LABEL_TIPO_GEOMETRIA = 'Tipo de geometría';
export const LABEL_LISTA_MEDICIONES = 'Lista de mediciones';

export const ICON_INCIAR_MEDICION = 'pi pi-check';
export const ICON_FINALIZAR_MEDICION = 'pi pi-times';

export const TITLE_RESALTAR = 'Resaltar';

export const TIPO_MEDICIONES = [
    {
        id: 1,
        nombre: 'Línea',
        icon: 'fas fa-slash',
        shape: 'Section',
        title: 'Línea'
    },
    {
        id: 2,
        nombre: 'Multilinea',
        icon: 'fas fa-slash',
        shape: 'Line',
        title: 'Multilinea'
    },
    {
        id: 3,
        nombre: 'Polígono',
        icon: 'fas fa-draw-polygon',
        shape: 'Polygon',
        title: 'polígono'
    }
];
export const columnDefs = [
    {
        headerName: "",
        field: "",
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        width: 38,
        minWidth: 38,
        maxWidth: 38,
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
        // field: "icon",
        width: 70,
        minWidth: 70,
        cellRendererFramework: (params) => {
            return <i className={params.data.icon}></i>;
        },
        cellClass: 'text-md-center'
    }
];

export const generarPinnedBottonRowData = [
    {
        id: 'Total',
        medida: "0"
    }
];