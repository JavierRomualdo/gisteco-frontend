import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import GeoserverLayer from 'easyolmaps/layer/GeoserverLayer';
import customMap from './customMap';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';

const createGeoserverLayers = (capas) => {
    let ly;
    const url = 'http://gisteco.epsgrau.pe:8080/geoserver/wms';

    return capas.map((capa) => {
        const { nombre, id, nombre_geoserver } = capa;
        ly = new GeoserverLayer(nombre_geoserver, {
            url,
            visible: false,
            crossOrigin: true,
            params: {
                tilesorigin: '-20026376.39,-20048966.10'
            }
        });
        ly.setProperties({ nombre, id, estilos: {} });
        return ly;
    })
};


export const createMap = (center, capas, storeContext) => {

    proj4.defs("EPSG:32717", "+proj=utm +zone=17 +south +datum=WGS84 +units=m +no_defs");
    register(proj4);

    const Map = customMap(storeContext);

    const mapol = new Map({
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            ...createGeoserverLayers(capas)
        ],
        view: new View({
            center: fromLonLat(center),
            zoom: 17
        })
    });

    return mapol;
};