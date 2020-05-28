import React from 'react';
import ImagenAccion from "../../../../ImagenAccion";
import IconEstado from '../../../../IconEstado';

export const LABEL_LISTA_IMAGENES = 'Lista de imágenes';

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
        headerName: "Imagen",
        field: "imagen",
        width: 40,
        minWidth: 40,
        cellRendererFramework: (params) => <ImagenAccion imagen={params.data.imagen}/>
    },
    {
        headerName: "Descripcion",
        field: "descripcion",
        width: 100,
        minWidth: 100,
        editable: true,
        cellStyle: (params) => {
            const color  = params.value ? '' : '#f9c4c4';    
            return { backgroundColor: color };
        }
    },
    {
        headerName: "Estado",
        field: 'estado',
        width: 40,
        minWidth: 40,
        cellRendererFramework: (params) => <IconEstado estado={params.data.estado}/>
    }
];