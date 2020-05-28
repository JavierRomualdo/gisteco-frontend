import { FILTRO_ESPACIAL_KEY, FILTRO_AVANZADO_KEY } from "../global/values";

const joinFilters = (filtroGeometrico, filtroAvanzado) => {
    const conds = [];
    if (filtroGeometrico) conds.push(filtroGeometrico);
    if (filtroAvanzado) conds.push(filtroAvanzado);
    return conds.join(" AND ");
}

const resolveFilter = (filtroGeometrico, filtroAvanzado) => {
    return joinFilters(filtroGeometrico, filtroAvanzado)
};

export const setFiltroGeometrico = (capa, filtro) => {
    const filtroAvanzado = capa.get(FILTRO_AVANZADO_KEY),
        finalFilter = resolveFilter(filtro, filtroAvanzado);
    capa.set(FILTRO_ESPACIAL_KEY, filtro);
    capa.filter(finalFilter);
}

export const setFiltroAvanzado = (capa, filtro) => {
    const filtroGeometrico = capa.get(FILTRO_ESPACIAL_KEY),
        finalFilter = resolveFilter(filtroGeometrico, filtro);
    capa.set(FILTRO_AVANZADO_KEY, filtro);
    capa.filter(finalFilter);
}

export const setFiltroCapa = (capa, filtro) => {
    capa.setProperties({ [FILTRO_ESPACIAL_KEY]: "", [FILTRO_AVANZADO_KEY]: "" });
    capa.filter(filtro);
}

export const getFiltroGeometrico = (capa) => capa.get(FILTRO_ESPACIAL_KEY) || '';

export const getFiltroAvanzado = (capa) => capa.get(FILTRO_AVANZADO_KEY);