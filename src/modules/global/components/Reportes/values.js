import React from 'react';
import ButtonAction from "../ButtonAction";
import { type } from '../../values';
import { Clipboard } from '../../../../lib/icons';
import { CAPA_TUBERIAS, CAPA_USUARIOS, CAPA_TUBERIAS_ALCANTARILLADO } from '../../../values';

// MENSAJES
export const MSJ_NO_HAY_REPORTES = 'No hay reportes';
// LABEL
export const LABEL_NOTA_REPORTES = 'Los resultados de los reportes varían de acuerdo al contenido visible de la capa o los filtros que tenga.';
export const LABEL_LISTADO_REPORTES = 'Listado de reportes';
export const LABEL_TAMANIO_TABLA = 'calc(100vh - 300px)';
export const LABEL_REPORTE = 'Reporte';
export const LABEL_REPORTES_COLLAPSE = 'collapseReportes';
// LISTA
export const LISTA_REPORTES = [
    {
        id: 1,
        reporte: 'Tuberías de agua por material'
    },
    {
        id: 2,
        reporte: 'Tuberías de agua por tipo de función'
    },
    {
        id: 3,
        reporte: 'Tuberías de agua por material y diámetro'
    },
    {
        id: 4,
        reporte: 'Tuberías de alcantarillado por estado de conservación'
    },
    {
        id: 5,
        reporte: 'Tuberías de alcantarillado por material y diámetro'
    },
    {
        id: 6,
        reporte: 'Cantidad de usuarios por categoría'
    },
    {
        id: 7,
        reporte: 'Cantidad de usuarios por estado y categoría'
    },
    {
        id: 8,
        reporte: 'Cantidad de usuarios por estado y situación'
    }
];

export const PARAMETROS_REPORTE = {
    [LISTA_REPORTES[0].id]: {
        idCapa: CAPA_TUBERIAS,
        titulo: [LISTA_REPORTES[0].reporte],
        cql_filter: 'length is not null',
        aggregationAttribute: 'length',
        functions: ['Sum'],
        groupByAttributes: ['material']
    },
    [LISTA_REPORTES[1].id]: {
        idCapa: CAPA_TUBERIAS,
        titulo: [LISTA_REPORTES[1].reporte],
        cql_filter: 'length is not null',
        aggregationAttribute: 'length',
        functions: ['Sum'],
        groupByAttributes: ['tipo_funcion']
    },
    [LISTA_REPORTES[2].id]: {
        idCapa: CAPA_TUBERIAS,
        titulo: [LISTA_REPORTES[2].reporte],
        cql_filter: 'length is not null',
        aggregationAttribute: 'length',
        functions: ['Sum'],
        groupByAttributes: ['material', 'dn_plg']
    },
    [LISTA_REPORTES[3].id]: {
        idCapa: CAPA_TUBERIAS_ALCANTARILLADO,
        titulo: [LISTA_REPORTES[3].reporte],
        cql_filter: 'length is not null',
        aggregationAttribute: 'length',
        functions: ['Sum'],
        groupByAttributes: ['estado_conservacion']
    },
    [LISTA_REPORTES[4].id]: {
        idCapa: CAPA_TUBERIAS_ALCANTARILLADO,
        titulo: [LISTA_REPORTES[4].reporte],
        cql_filter: 'length is not null',
        aggregationAttribute: 'length',
        functions: ['Sum'],
        groupByAttributes: ['material', 'dn_plg']
    },
    [LISTA_REPORTES[5].id]: {
        idCapa: CAPA_USUARIOS,
        titulo: [LISTA_REPORTES[5].reporte],
        cql_filter: 'suministro is not null',
        aggregationAttribute: 'suministro',
        functions: ['Count'],
        groupByAttributes: ['categoria']
    },
    [LISTA_REPORTES[6].id]: {
        idCapa: CAPA_USUARIOS,
        titulo: [LISTA_REPORTES[6].reporte],
        cql_filter: 'suministro is not null',
        aggregationAttribute: 'suministro',
        functions: ['Count'],
        groupByAttributes: ['estado_predio', 'categoria']
    },
    [LISTA_REPORTES[7].id]: {
        idCapa: CAPA_USUARIOS,
        titulo: [LISTA_REPORTES[7].reporte],
        cql_filter: 'suministro is not null',
        aggregationAttribute: 'suministro',
        functions: ['Count'],
        groupByAttributes: ['estado_predio', 'situacion_conexion']
    }
}

export const LISTA_COLUMNAS_REPORTE_RESULTADO = {
    [LISTA_REPORTES[0].id]: ['Material', 'Total metros'],
    [LISTA_REPORTES[1].id]: ['Tipo función', 'Total metros'],
    [LISTA_REPORTES[2].id]: ['Material', 'Diámetro (plg)', 'Total metros'],
    [LISTA_REPORTES[3].id]: ['Estado conservación', 'Total metros'],
    [LISTA_REPORTES[4].id]: ['Material', 'Diámetro (plg)', 'Total metros'],
    [LISTA_REPORTES[5].id]: ['Categoría', 'Número usuarios'],
    [LISTA_REPORTES[6].id]: ['Estado predio', 'Categoría', 'Número usuarios'],
    [LISTA_REPORTES[7].id]: ['Estado predio', 'Situación conexión', 'Número usuarios'],
}

// GENERAR COLUMNAS TABLA: AG-GRID
export const generarColumnasPaReportes = (handleReporteButtonClick, nombreCollapse) => [
    {
        headerName: "Reporte",
        field: "reporte",
        width: 325,
        minWidth: 325
    },
    {
        headerName: "Opción",
        width: 80,
        minWidth: 80,
        cellClass: 'text-md-center',
        cellRendererFramework: (params) => {
            return (<ButtonAction type={type.button} title={LABEL_REPORTE} className={"btn btn-sm btn-link text-body"}
                onClickButton={handleReporteButtonClick.bind(null, params.data.id)} data-toggle="collapse"
                data-target={`#${nombreCollapse}`} aria-expanded="false" aria-controls={`${nombreCollapse}`}>
                <Clipboard />
            </ButtonAction>);
        }
    }
];
