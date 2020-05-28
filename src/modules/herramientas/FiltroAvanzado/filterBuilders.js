import moment from 'moment';

/** helpers */

const getFiltroLista = (lista, field = 'nombre') => {
    return lista.map(e => `'${e[field]}'`).join(",");
}

const getFiltroPeriodo = (propiedad, fechaInicial, fechaFinal) => {
    const conds = [];
    let cond = '';
    if (fechaInicial) {
        if (fechaInicial instanceof Date) {
            conds.push(`${propiedad} >= '${moment(fechaInicial).format('YYYY-MM-DD')}'`);
        } else {
            conds.push(`${propiedad} >= '${fechaInicial}'`);
        }
    }
    if (fechaFinal) {
        if (fechaFinal instanceof Date) {
            conds.push(`${propiedad} <= '${moment(fechaFinal).format('YYYY-MM-DD')}'`);
        } else {
            conds.push(`${propiedad} <= '${fechaFinal}'`);
        }
    }

    cond = conds.join(" AND ");
    if (conds.length > 1) {
        cond = `(${cond})`;
    }
    return cond;
}

const generarAnioAntiguedad = (numero) => {
    return moment().subtract(numero, 'year').format('YYYY');
}

const getFiltroAntiguedadTuberia = (aniosAntiguedad, anioInicial, anioFinal, filtrarPorIntervalo) => {
    if (filtrarPorIntervalo) {
        return getFiltroPeriodo('anyo', anioInicial, anioFinal);
    } else if (aniosAntiguedad) {
        const anioAntiguedad = generarAnioAntiguedad(parseInt(aniosAntiguedad));
        return `anyo >= ${anioAntiguedad}`;
    }
    return null;
}

/** end helpers */

const usuarios = (params) => {

    const {
        idProvincia, idDistrito, estadoPredio, tipoServicio,
        categoriaPredio, periodoGeorefFechaInf, periodoGeorefFechaSup,
        georeferenciadoXGIS
    } = params;

    const conds = [];
    let fPeriodoGeoref = '';

    if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);
    if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);

    if (estadoPredio.length) conds.push(`estado_predio IN (${getFiltroLista(estadoPredio)})`);
    if (tipoServicio.length) conds.push(`tipo_servicio IN (${getFiltroLista(tipoServicio)})`);
    if (categoriaPredio.length) conds.push(`categoria IN (${getFiltroLista(categoriaPredio)})`);

    fPeriodoGeoref = getFiltroPeriodo('fecha_georeferenciacion', periodoGeorefFechaInf, periodoGeorefFechaSup);
    if (fPeriodoGeoref) conds.push(fPeriodoGeoref);

    if (georeferenciadoXGIS) conds.push(`geo_gis = true`);

    return conds.join(" AND ");
}

const tuberiasAgua = (params) => {
    const conds = [];
    const {
        idProvincia, idDistrito, material, funcion,
        tipo, anioInicial, anioFinal, aniosAntiguedad, filtrarPorIntervalo
    } = params;
    let fAntiguedad = '';

    if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);// provincia
    if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);// distrito

    if (material.length) conds.push(`material IN (${getFiltroLista(material)})`);// material
    if (funcion.length) conds.push(`tipo_funcion IN (${getFiltroLista(funcion)})`);// función
    if (tipo.length) conds.push(`tipo IN (${getFiltroLista(tipo)})`);// tipo

    // Antigüedad
    fAntiguedad = getFiltroAntiguedadTuberia(aniosAntiguedad, anioInicial, anioFinal, filtrarPorIntervalo);
    if (fAntiguedad) conds.push(fAntiguedad);

    return conds.join(" AND ");
}

const tuberiasAlcantarillado = (params) => {
    const conds = [];
    const {
        idProvincia, idDistrito, material,
        tipo, anioInicial, anioFinal, aniosAntiguedad, filtrarPorIntervalo
    } = params;
    let fAntiguedad = '';

    if (parseInt(idProvincia)) conds.push(`id_ciudad = ${idProvincia}`);// provincia
    if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);// distrito

    if (material.length) conds.push(`material IN (${getFiltroLista(material)})`);// material
    if (tipo.length) conds.push(`tipo IN (${getFiltroLista(tipo)})`);// tipo

    fAntiguedad = getFiltroAntiguedadTuberia(aniosAntiguedad, anioInicial, anioFinal, filtrarPorIntervalo);
    if (fAntiguedad) conds.push(fAntiguedad);

    return conds.join(" AND ");
}

const problemas = (parametros) => {

    const conds = [];
    const { idProvincia, idDistrito, tipologia, detalle, alcance,
        periodoRegistroFechaInf, periodoRegistroFechaSup, atendido, enElPlazo } = parametros;
    let fPeriodoRegistro = '';

    if (parseInt(idProvincia)) conds.push(`id_provincia = ${idProvincia}`);
    if (parseInt(idDistrito)) conds.push(`id_distrito = ${idDistrito}`);

    if (tipologia.length) conds.push(`id_tipologia_problema IN (${getFiltroLista(tipologia, 'id')})`);
    if (detalle.length) conds.push(`id_corr_tipo_reclamo_problema IN (${getFiltroLista(detalle, 'id')})`);
    if (alcance.length) conds.push(`id_tipo_problema_t IN (${getFiltroLista(alcance, 'id')})`);

    fPeriodoRegistro = getFiltroPeriodo('fecha', periodoRegistroFechaInf, periodoRegistroFechaSup);
    if (fPeriodoRegistro) conds.push(fPeriodoRegistro);

    if (atendido !== null) conds.push(`flag_pendiente = ${atendido}`);
    if (enElPlazo !== null) conds.push(`plazo_vencido = ${enElPlazo}`);

    return conds.join(" AND ");
}

export default {
    usuarios,
    tuberiasAgua,
    tuberiasAlcantarillado,
    problemasOperacionales: problemas,
    problemasComerciales: problemas
}