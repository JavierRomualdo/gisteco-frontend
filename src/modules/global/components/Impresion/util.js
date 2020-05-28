import { GET_RECLAMO } from "./queries";
import Feature from 'ol/Feature';
import { fromExtent } from 'ol/geom/Polygon';
import { Fill, Stroke, Text, Style } from 'ol/style';
import Translate from 'ol/interaction/Translate';
import Collection from 'ol/Collection';
import { getCenter } from 'ol/extent';
import { useState, useEffect } from "react";
import { transformExtent } from 'ol/proj';
import GeoserverLayer from "easyolmaps/layer/GeoserverLayer";
import { createURLWithParameters, getLayerName, getServiceURL } from "easyolmaps/util";
import { IMPRESION } from "../SidebarMap/mapper";

const printFeatureStyle = new Style({
    text: new Text({
        text: 'HOJA DE\nIMPRESIÓN',
        font: "Bold 12px sans-serif",
        fill: new Fill({
            color: "#000000"
        }),
        stroke: new Stroke({
            color: "#ffffff"
        })
    }),
    stroke: new Stroke({
        color: "#000000",
        width: 4
    }),
    fill: new Stroke({
        color: [255, 255, 255, 0.1]
    })
});

export const getReclamo = (apollo, numReclamo) => {
    return apollo.query({
        query: GET_RECLAMO,
        fetchPolicy: 'network-only',
        variables: { numReclamo }
    }).then(({ data }) => data.comercial.reclamo);
}
/* funciones para dibujar el área de impresión */

const crearGeomParaHoja = (dimensionesMapa, escala, map) => {

    const { width, height } = dimensionesMapa;
    const k = 0.00035 /* factor de conversión. unidades = metros/pixel */,
        resolucion = map.getView().getResolution();

    const k1 = k * parseInt(escala) * (1 / resolucion);

    const w = width * k1,
        h = height * k1;

    const extent = map.getView().calculateExtent([w, h]);
    return fromExtent(extent);
}

const translate = (ps, geom) => {
    const psGeom = ps.getGeometry();
    const cf = getCenter(geom.getExtent()),
        cg = getCenter(psGeom.getExtent());
    const [dx, dy] = cg.map((c, i) => cf[i] - c);
    psGeom.translate(dx, dy);
}


const crearHojaImpresion = (map) => {
    const ft = new Feature();
    ft.setStyle(printFeatureStyle);
    map.utils.getSource().addFeature(ft);
    return ft;
};

export const usePrintingSheetFeature = (dimensionesMapa, escala, map, store, horizontal) => {
    const impresionActiva = store.idTabActivo === IMPRESION && store.sidebarAbierto;
    const [ps] = useState(crearHojaImpresion(map));

    useEffect(() => {
        const i = new Translate({ features: new Collection([ps]) });
        map.addInteraction(i);
        return () => {
            map.removeInteraction(i);
        }
    }, [map, ps]);

    useEffect(() => {
        if (impresionActiva) {
            const lgeom = ps.getGeometry();
            const geom = crearGeomParaHoja(dimensionesMapa, escala, map, horizontal);
            ps.setGeometry(geom);
            if (lgeom) translate(ps, lgeom);

        } else {
            ps.setGeometry(null);
        }
    }, [ps, impresionActiva, dimensionesMapa, escala, map, horizontal]);

    return ps;
}
/* */

const getLegendGraphicURL = (ly) => {
    const wmsURL = getServiceURL(ly);

    return createURLWithParameters(wmsURL, {
        REQUEST: 'GetLegendGraphic',
        VERSION: '2.0.0',
        LAYER: getLayerName(ly),
        FORMAT: 'image/png',
        STYLE: ly.getStyle(),
        SCALE: 2000000,
        WIDTH: 16,
        HEIGHT: 16,
        LEGEND_OPTIONS: 'forceLabels:on',
        ENV: ly.getSource().getParams().ENV || ''
    }).toString();
}

export const createPrintingRequest = (
    ps/* printing sheet */,
    {
        layout,
        escala: scale,
        horizontal,
        titulo: mapTitle,
        ubicacion: location,
        comentario: comment,
        leyenda
    },
    map
) => {

    let lyParams, params;

    const activeLayers = map.getLayers().getArray().filter(ly => ly instanceof GeoserverLayer && ly.getVisible());

    const layers = activeLayers.map(ly => {

        lyParams = ly.getSource().getParams();

        params = {
            type: 'WMS',
            baseURL: getServiceURL(ly),
            format: 'image/png',
            layers: [lyParams.LAYERS],
            styles: [ly.getStyle()],
            customParams: {}
        };

        if (ly.getFilter()) {
            params.customParams.CQL_FILTER = ly.getFilter();
        }
        if (lyParams.ENV) {
            params.customParams.ENV = lyParams.ENV
        }

        return params;
    });

    const bbox = transformExtent(ps.getGeometry().getExtent(), map.codeProjection, 'EPSG:4326'),
        center = getCenter(bbox);

    const request = {
        layout,
        srs: 'EPSG:4326',
        units: 'degrees',
        geodetic: false,
        outputFilename: 'mapa_impresion',
        outputFormat: 'pdf',
        layers,
        pages: [
            {
                bbox,
                center,
                scale: parseInt(scale),
                dpi: "300",
                rotation: horizontal ? 90 : 0,
                geodetic: false,
                strictEpsg4326: true,
                mapTitle,
                comment,
                location,
            }
        ]
    };

    if (leyenda) {
        request.legends = [
            {
                classes: activeLayers.map(ly => ({
                    icons: [getLegendGraphicURL(ly)],
                    name: ""
                })),
                name: "Leyenda"
            }
        ]
    }

    return request;
}