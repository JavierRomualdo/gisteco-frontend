import React from 'react';
import ButtonAction from "../../../global/components/ButtonAction";
import { type, TAG_APROBAR, TAG_DESAPROBAR } from "../../../global/values";
import { LikeIcon, DisLikeIcon } from '../../../../lib/icons';

// TITULOS
export const TITULO_SOLICITUD_USUARIO_APROBADA = 'Solicitud del usuario aprobada';
export const TITULO_APROBAR_SOLICITUD = 'Aprobar solicitud';
export const TITULO_DESAPROBAR_SOLICITUD = 'Desaprobar solicitud';
// LABEL
export const LABEL_LISTADO_SOLICITUDES = 'Listado de solicitudes';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 240px)';
// MENSAJES
export const MSJ_NO_HAY_SOLICITUDES = 'No hay solicitudes pendientes';
export const MSJ_SOLICITUD_APROBADA = 'Solicitud aprobada';
export const MSJ_SOLICITUD_NO_APROBADA = 'Solicitud no aprobada';
export const MSJ_SOLICITUD_DESAPROBADA = 'Solcitud desaprobada';
export const MSJ_SOLICITUD_NO_DESAPROBADA = 'Solicitud no desaprobada';

export const generarColumnasPaSolicitudesPendientes = (onAprobarSolicitudUsuario, onDesaprobarSolicitudUsuario) => [
    {
        headerName: "Dni",
        field: "dni",
        width: 80,
        minWidth: 80
    },
    {
        headerName: "Nombre",
        field: "nombre_completo",
        width: 200,
        minWidth: 200
    },
    {
        headerName: "Correo",
        field: "correo",
        width: 180,
        minWidth: 180
    },
    {
        headerName: "Cargo",
        field: "cargo",
        width: 220,
        minWidth: 220
    },
    {
        headerName: "Dependencia",
        field: "dependencia",
        width: 220,
        minWidth: 220
    },
    {
        headerName: "Zonal",
        field: "zonal",
        width: 80,
        minWidth: 80
    },
    {
        headerName: "Fecha solicitud",
        field: "fecha_solicitud",
        width: 150,
        minWidth: 150
    },
    {
        headerName: "Opción",
        width: 80,
        minWidth: 80,
        filterParams: { newRowsAction: "keep" },
        cellClass: 'text-md-center',
        cellRendererFramework: (params) => {
            return (
                <div>
                    <ButtonAction type={type.button} title={TAG_APROBAR} className={"btn btn-sm btn-link pb-0 pt-0 text-primary"}
                        onClickButton={onAprobarSolicitudUsuario.bind(null, params.data)}>
                        <LikeIcon />
                    </ButtonAction>
                    <ButtonAction type={type.button} title={TAG_DESAPROBAR} className={"btn btn-sm btn-link pb-0 pt-0 text-danger"}
                        onClickButton={onDesaprobarSolicitudUsuario.bind(null, params.data)}>
                        {/* text-body */}
                        <DisLikeIcon />
                    </ButtonAction>
                </div>
            );
        }
    }
];