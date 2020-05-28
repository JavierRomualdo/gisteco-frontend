import { CAPA_PUNTOS_CONTROL_COMERCIAL, CAPA_PUNTOS_CONTROL_OPERACIONAL } from "../../values";

export const verEnMapa = (tipoPuntoControl, puntoControl, map) => {

    const capa = tipoPuntoControl === 1 ?
        map.getCapaById(CAPA_PUNTOS_CONTROL_COMERCIAL) :
        map.getCapaById(CAPA_PUNTOS_CONTROL_OPERACIONAL);

    capa.getFeatures({
        cql_filter: `id_punto_control = ${puntoControl.id}`
    }, {
        dataProjection: 'EPSG:32717',
        featureProjection: map.codeProjection
    })
        .then(([ft]) => {
            if (ft) {
                ft.set('capa', capa);
                map.volarHastaFeature(ft, { maxZoom: 17 });
            }
        });
}