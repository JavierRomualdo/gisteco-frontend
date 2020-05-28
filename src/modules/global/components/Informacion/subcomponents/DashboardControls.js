import React from 'react';
import { CAPA_USUARIOS, CAPA_TUBERIAS, CAPA_USUARIOS_VMA, CAPA_TUBERIAS_ALCANTARILLADO } from '../../../../values';
import DashboardUsuarios from '../Dashboards/DashboardUsuarios';
import DashboardTuberias from '../Dashboards/DashboardTuberias';

export default ({
    capa,
    propiedades
}) => {

    const idCapa = capa.get('id');

    if (idCapa === CAPA_USUARIOS || idCapa === CAPA_USUARIOS_VMA) {
        return <DashboardUsuarios capa={capa} infoUsuario={propiedades} />
    } else if (idCapa === CAPA_TUBERIAS || idCapa === CAPA_TUBERIAS_ALCANTARILLADO) {
        return <DashboardTuberias capa={capa} infoTuberia={propiedades} />
    }
    return <p className='m-0 p-3 pl-3'>No hay informes disponibles</p>
}