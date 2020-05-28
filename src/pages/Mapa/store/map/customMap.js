import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';
import {
    estiloFeatureMedicion,
    estiloCapaDibujos,
    estiloFeatureSeleccionado,
    estiloMarcador
} from './estilos';
import Draw from 'easyolmaps/vector/Draw';
import GeometryCollection from 'ol/geom/GeometryCollection';
import GeoserverLayer from 'easyolmaps/layer/GeoserverLayer';
import Point from 'ol/geom/Point';
import { Feature } from 'ol';

export default ({ interactionApi }) => {

    return class extends Map {

        medidas = null;
        seleccion = null;
        marcadores = null;
        dibujos = null;
        utils = null;
        drawer = null;
        popup = null;

        constructor(props) {
            super(props);

            // capa de medidas
            this.medidas = new VectorLayer({
                source: new VectorSource(),
                style: estiloFeatureMedicion
            });

            // capa de dibujo
            this.dibujos = new VectorLayer({
                source: new VectorSource(),
                style: estiloCapaDibujos
            });

            // capa de seleccion
            this.seleccion = new VectorLayer({
                source: new VectorSource(),
                style: estiloFeatureSeleccionado
            });

            // capa de marcadores
            this.marcadores = new VectorLayer({
                source: new VectorSource()
            });

            // capa utils
            this.utils = new VectorLayer({
                source: new VectorSource()
            });

            // popup (overlay)
            this.popup = new Overlay({
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });

            // agregar capas vectoriales
            this.addLayer(this.medidas);
            this.addLayer(this.dibujos);
            this.addLayer(this.seleccion);
            this.addLayer(this.marcadores);
            this.addLayer(this.utils);
            // agregar overlays
            this.addOverlay(this.popup);
        }

        // control de capas
        getCapaById(capaId) {
            return this.getLayers().getArray().find(capa => capa.get('id') === capaId);
        }

        get capasActivas() {
            return this.getLayers().getArray().filter(ly => ly instanceof GeoserverLayer && ly.getVisible());
        }

        /**DIBUJO */

        dibujar(tarea, drawOptions, snapOptions) {
            this.terminarDibujo(tarea);
            this.drawer = new Draw({
                condition: (e) => e.originalEvent.button === 0,
                finishCondition: (e) => e.originalEvent.button === 0,
                ...drawOptions
            }, snapOptions);
            this.drawer.start(this);
            interactionApi.asignarControlDibujo(tarea);
        }

        terminarDibujo(tarea) {
            if (this.drawer) {
                //console.log(`finalizando dibujo dentro de MapApi, tarea '${tarea}'`)
                this.drawer.finish();
                this.drawer = null;
            }
        }

        /**UTILIDADES */

        // Relativas a dibujo
        limpiarDibujos() {
            this.dibujos.getSource().clear(true);
        }

        // Relativas a selección
        limpiarSeleccionados(fast) {
            this.seleccion.getSource().clear(fast);
        }

        agregarASeleccionados(fts, limpiar) {
            limpiar && this.limpiarSeleccionados(true);
            this.seleccion.getSource().addFeatures(fts);
        }

        // Relativas a acercamiento
        zoomSobreFeatures(fts) {
            const geomCollection = new GeometryCollection(fts.map(ft => ft.getGeometry()));
            this.volarHastaExtension(geomCollection.getExtent());
        }

        volarHastaExtension(extent, opts) {
            this.getView().fit(extent, { duration: 2000, ...opts });
        }

        volarHastaFeature(ft, opts, add2selected = true) {
            const extent = ft.getGeometry().getExtent();
            add2selected && this.agregarASeleccionados([ft], true);
            this.volarHastaExtension(extent, opts);
        }

        volarHastaUsuario(ft, add2selected) {
            this.volarHastaFeature(ft, { maxZoom: 20 }, add2selected);
        }        

        // Relativas a propiedades del mapa
        get codeProjection() {
            return this.getView().getProjection().getCode();
        }

        // Relativas a interacción con capas

        getCapaAtPixel(pixel, layerFilter) {
            // esta función retornará la capa que tengo al menos un elemento
            // ubicado en la posición señalada por el pixel.

            // si más de una capa cumple esta condición, se retornará la
            // capa superior.            
            return this.forEachLayerAtPixel(pixel, layer => layer, { layerFilter });
        }

        getCapaGeoserverAtPixel(pixel) {
            return this.getCapaAtPixel(pixel, (ly) => ly instanceof GeoserverLayer)
        }

        capaExisteEnPixel(pixel, capa) {
            const hit = this.getCapaAtPixel(
                pixel,
                (ly) => ly === capa
            );
            return hit !== undefined;
        }

        // Relativas a la capa marcadores

        agregarMarcador(coordinate, otherProps) {
            const ft = new Feature({ geometry: new Point(coordinate), ...otherProps });
            ft.setStyle(estiloMarcador);
            this.marcadores.getSource().addFeature(ft);
            return ft;
        }            
    }

}