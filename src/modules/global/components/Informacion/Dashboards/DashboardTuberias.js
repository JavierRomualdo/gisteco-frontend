import React from 'react';
import Mantenimientos from '../../PropiedadesFeature/subcomponents/tuberias/Mantenimientos';
import Incidencias from '../../PropiedadesFeature/subcomponents/tuberias/Incidencias';
import Carousel from '../subcomponents/Carousel';
import { CAPA_TUBERIAS, CAPA_TUBERIAS_ALCANTARILLADO } from '../../../../values';
import { useAbility, InformeCapa } from '../../../../../pages/Mapa/casl/ability';

const createItems = (capa, infoTuberia, ability) => {

    const gidTuberia = infoTuberia.gid,
        idCapa = capa.get('id');

    const tuberiaPertenece = idCapa === CAPA_TUBERIAS ? 'Red Agua' : 'Red Alcantarillado';
    const props = { gidTuberia, tuberiaPertenece };

    const items = [];

    if (
        (
            idCapa === CAPA_TUBERIAS &&
            ability.can('read', new InformeCapa({ id: "6" }))
        ) ||
        (
            idCapa === CAPA_TUBERIAS_ALCANTARILLADO &&
            ability.can('read', new InformeCapa({ id: "8" }))
        )
    ) {
        items.push({
            titulo: 'Mantenimientos',
            component: Mantenimientos,
            icon: 'fas fa-wrench',
            props
        });
    }
    if (ability.can('read', new InformeCapa({ id: "7" }))) {
        items.push({
            titulo: 'Fugas',
            component: Incidencias,
            icon: 'fas fa-tint',
            props
        })
    }

    return items;
}

export default ({ capa, infoTuberia }) => {

    const ability = useAbility();

    return (
        <Carousel items={createItems(capa, infoTuberia, ability)} />
    );
}