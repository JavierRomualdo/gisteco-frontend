import React from 'react';
import Carousel from '../subcomponents/Carousel';
import Lecturas from '../../PropiedadesFeature/subcomponents/usuarios/Lecturas';
import Facturacion from '../../PropiedadesFeature/subcomponents/usuarios/Facturacion';
import { CAPA_USUARIOS_VMA } from '../../../../values';
import InspeccionesVma from '../../PropiedadesFeature/subcomponents/usuariosVma/InspeccionesVma';
import { useAbility, InformeCapa } from '../../../../../pages/Mapa/casl/ability';
import GraficoConsumos from '../../../../comercial/components/GraficoConsumos';

const createItems = (capa, infoUsuario, ability) => {

    const idCapa = capa.get('id'),
        { suministro, nombre_usuario } = infoUsuario;

    const props = { suministro, nombre_usuario };

    const items = [];

    if (ability.can('read', new InformeCapa({ id: "3" }))) {
        items.push({
            titulo: 'Consumos',
            component: GraficoConsumos,
            icon: 'far fa-file-alt',
            props
        })
    };

    if (ability.can('read', new InformeCapa({ id: "2" }))) {
        items.push({
            titulo: 'Facturación',
            component: Facturacion,
            icon: 'far fa-file-alt',
            props
        })
    };

    if (ability.can('read', new InformeCapa({ id: "1" }))) {
        items.push({
            titulo: 'Lecturas',
            component: Lecturas,
            icon: 'far fa-file-alt',
            props
        })
    };

    if (
        idCapa === CAPA_USUARIOS_VMA &&
        ability.can('read', new InformeCapa({ id: "4" }))
    ) {
        items.push({
            titulo: 'Inspecciones',
            component: InspeccionesVma,
            icon: 'far fa-file-alt',
            props
        })
    }

    return items;
}

export default ({ capa, infoUsuario }) => {

    const ability = useAbility();

    return (
        <Carousel items={createItems(capa, infoUsuario, ability)} />
    )
};