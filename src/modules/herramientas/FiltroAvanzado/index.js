import React from 'react';
import {
    CAPA_USUARIOS,
    CAPA_TUBERIAS,
    CAPA_TUBERIAS_ALCANTARILLADO,
    CAPA_PROBLEMAS,
    CAPA_PROBLERMAS_COMERCIAL
} from '../../values';
import FAUsuario from './FAUsuario';
import FATuberiaAgua from './FATuberiaAgua';
import FATuberiaAlcantarillado from './FATuberiaAlcantarillado';
import { FAProblemasOperacionales, FAProblemasComerciales } from './FAProblemas';

const FiltroAvanzado = ({ capa }) => {

    const capaId = capa.get('id');

    if (capaId === CAPA_USUARIOS) return <FAUsuario />;
    else if (capaId === CAPA_TUBERIAS) return <FATuberiaAgua />;
    else if (capaId === CAPA_TUBERIAS_ALCANTARILLADO) return <FATuberiaAlcantarillado />;
    else if (capaId === CAPA_PROBLEMAS) return <FAProblemasOperacionales />;
    else if (capaId === CAPA_PROBLERMAS_COMERCIAL) return <FAProblemasComerciales />;
    return null;

}

export default FiltroAvanzado;