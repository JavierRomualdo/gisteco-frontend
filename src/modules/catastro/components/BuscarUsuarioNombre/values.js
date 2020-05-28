import React from 'react';
import ButtonAction from '../../../global/components/ButtonAction';
import { type } from '../../../global/values';
import { PlaneIcon } from '../../../../lib/icons';
// MENSAJES
export const MSJ_INGRESAR_APELLIDOS_NOMBRES = 'Ingrese apellidos, nombres';
export const MSJ_USUARIO_NO_SE_LOCALIZO = 'El usuario no se pudo localizar';
// LABEL
export const LABEL_NOMBRE = 'Nombre';
export const LABEL_PROVINCIA = 'Provincia';
export const LABEL_DISTRITO = 'Distrito';
export const LABEL_LISTADO_USUARIOS = 'Listado de usuarios';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 470px)';

export const generarColumnasPaUsuarios = (handleSearchButtonClick)=> [
    {
        headerName: "Nombre",
        field: "nombre_titular",
        width: 325,
        minWidth: 325
    },
    {
        headerName: "Opción",
        width: 80,
        minWidth: 80,
        cellClass: 'text-md-center',
        cellRendererFramework: (params)=>{
            return (params.data.esta_georeferenciado ? <ButtonAction type={type.button} title={"Localizar"} className={"btn btn-sm btn-link text-body"}
                onClickButton={handleSearchButtonClick.bind(null, params.data.num_inscripcion)}>
                <PlaneIcon/>
            </ButtonAction> : null);
        }
    }
];