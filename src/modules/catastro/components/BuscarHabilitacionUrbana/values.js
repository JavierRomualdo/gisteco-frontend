import React from 'react';
import ButtonAction from "../../../global/components/ButtonAction";
import { PlaneIcon } from "../../../../lib/icons";
import { type } from '../../../global/values';
import { LABEL_LOCALIZAR } from '../../../values';

// MENSAJES
export const MSJ_NO_HAY_HABILITACION_URBANA = 'No se encontraron habilitaciones urbanas';
export const MSJ_HABILITACION_URBANA_NO_SE_LOCALIZO = 'La habilitacion urbana no se pudo localizar';
// PLACEHOLDER
export const PCHR_INGRESAR_HABILITACION_URBANA = 'Ingrese nombre de la habilitación urbana';
// LABEL
export const LABEL_LISTADO_HABILITACIONES_URBANAS = 'Listado de habilitaciones urbanas';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 260px)';
// GENERAR COLUMNAS TABLA: AG-GRID
export const generarColumnasPaHabilitacionesUrbanas = (handleSearchButtonClick)=> [
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