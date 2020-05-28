import React from 'react';
import ButtonAction from '../../../global/components/ButtonAction';
import { type } from '../../../global/values';
import { PlaneIcon } from '../../../../lib/icons';
import { LABEL_LOCALIZAR } from '../../../values';

// MENSAJES
export const MSJ_NO_HAY_CALLES = 'No se encontraron calles';
export const MSJ_CALLE_NO_SE_LOCALIZO = 'La calle no se pudo localizar';
// PLACEHOLDER
export const PCHR_INGRESAR_CALLE = 'Ingrese nombre de la calle';
// LABEL
export const LABEL_LISTADO_CALLES = 'Listado de calles';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 260px)';
// GENERAR COLUMNAS TABLA: AG-GRID
export const generarColumnasPaCalles = (handleSearchButtonClick)=> [
    {
        headerName: "Nombre",
        field: "nombre",
        width: 325,
        minWidth: 325
    },
    {
        headerName: "Opción",
        width: 80,
        minWidth: 80,
        cellClass: 'text-md-center',
        cellRendererFramework: (params)=>{
            return (<ButtonAction type={type.button} title={LABEL_LOCALIZAR} className={"btn btn-sm btn-link text-body"}
                onClickButton={handleSearchButtonClick.bind(null, params.data.id)}>
                <PlaneIcon/>
            </ButtonAction>);
        }
    }
];