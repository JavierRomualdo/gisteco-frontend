import React from 'react';
import IconEstado from '../../../../IconEstado';
import TipoArchivo from '../../../../TipoArchivo';
import ButtonDowloand from '../../../../ButtonDownload';

export const LABEL_LISTA_ARCHIVOS = 'Lista de archivos';

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
        headerName: "Archivo",
        field: "tipo_archivo",
        width: 47,
        minWidth: 47,
        cellRendererFramework: (params) => <TipoArchivo tipo_archivo={params.data.tipo_archivo}/>
    },
    {
        headerName: "Nombre",
        field: "nombre",
        width: 55,
        minWidth: 55
    },
    {
        headerName: "Descripcion",
        field: "descripcion",
        width: 64,
        minWidth: 64,
        editable: true,
        cellStyle: (params) => {
            const color  = params.value ? '' : '#f9c4c4';    
            return { backgroundColor: color };
        }
    },
    {
        headerName: "Estado",
        field: 'estado',
        width: 48,
        minWidth: 48,
        cellRendererFramework: (params) => <IconEstado estado={params.data.estado}/>
    },
    {
        headerName: "Opción",
        width: 20,
        minWidth: 20,
        cellRendererFramework: (params) => <ButtonDowloand title="Decargar" target="_blank" archivo={params.data.archivo} className="btn btn-sm btn-link text-body p-0"/>
    }
];