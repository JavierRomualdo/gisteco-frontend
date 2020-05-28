import Swal from "sweetalert2";
import WKT from 'ol/format/WKT';
import { DIVIDIR_PREDIO, UNIR_PREDIO } from "./mutations";
import { CAPA_PREDIOS } from "../../../values";

const DIBUJAR_LINEA_DIVISORIA_PREDIO = 'DIBUJAR_LINEA_DIVISORIA_PREDIO',
    DIBUJAR_LINEA_UNION_PREDIO = 'DIBUJAR_LINEA_UNION_PREDIO';

const Confirmation = Swal.mixin({
    title: '¡Cuidado!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, proceder'
});

const dividirPredioMutation = ({ apollo, predio, linea }) => {

    const wktfmt = new WKT(),
        wktLinea = wktfmt.writeFeature(linea);

    return apollo.mutate({
        mutation: DIVIDIR_PREDIO,
        variables: {
            predioGid: predio.get('gid'),
            wktLinea
        },
        fetchPolicy: "no-cache"
    }).then(({ data }) => data.catastro.dividirPredio);
}

export const dividirPredio = ({ coordinate, map, predios, apollo }) => {

    map.dibujos.getSource().clear(true);

    predios.getFeaturesAtCoordinate(
        coordinate,
        map, null,
        {
            dataProjection: 'EPSG:32717',
            featureProjection: map.codeProjection
        })
        .then(([predio]) => {
            predio.set('capa', predios);
            map.agregarASeleccionados([predio], true);

            map.dibujar(DIBUJAR_LINEA_DIVISORIA_PREDIO, {
                shape: 'Section',
                source: map.dibujos.getSource()
            });

            map.drawer.once('drawend', (drawEvt) => {

                map.terminarDibujo();

                Confirmation.fire({ text: "¿Está seguro de eliminar el predio?" })
                    .then(result => {

                        const linea = drawEvt.feature;

                        if (result.value) {
                            dividirPredioMutation({
                                apollo,
                                predio,
                                linea
                            })
                                .then(({ mensaje, codigo_respuesta }) => {
                                    if (codigo_respuesta === 1) {
                                        Swal.fire('¡Buen trabajo!', '¡El predio fue dividido!', 'success');
                                        map.limpiarSeleccionados(true);
                                        map.dibujos.getSource().removeFeature(linea);
                                    }
                                    else {
                                        Swal.fire('¡Error!', mensaje, 'error');
                                    }
                                }).catch((error) => Swal.fire('¡Error!', error.message, 'error'))
                        }
                        else if (result.dismiss === Swal.DismissReason.cancel) {
                            map.limpiarSeleccionados(true);
                            map.dibujos.getSource().removeFeature(linea);
                        }
                    })
            })

        })
}

const unirPredioMutation = ({ linea, apollo }) => {
    const wktfmt = new WKT(),
        wktLinea = wktfmt.writeFeature(linea);

    return apollo.mutate({
        mutation: UNIR_PREDIO,
        variables: { wktLinea },
        fetchPolicy: "no-cache"
    }).then(({ data }) => data.catastro.unirPredio);
}

export const unirPredio = ({ map, apollo }) => {

    map.dibujos.getSource().clear(true);

    map.dibujar(DIBUJAR_LINEA_UNION_PREDIO, {
        shape: 'Section',
        source: map.dibujos.getSource()
    });

    map.drawer.once('drawend', (drawEvt) => {

        map.terminarDibujo();

        Confirmation.fire({ text: "¿Está seguro de unir los predios?" })
            .then(result => {

                const linea = drawEvt.feature;

                if (result.value) {

                    unirPredioMutation({
                        apollo,
                        linea
                    })
                        .then(({ mensaje, codigo_respuesta }) => {
                            if (codigo_respuesta === 1) {
                                Swal.fire('¡Buen trabajo!', '¡Los predio se han unido!', 'success');
                                map.dibujos.getSource().removeFeature(linea);
                            }
                            else {
                                Swal.fire('¡Error!', mensaje, 'error');
                            }
                        }).catch((error) => Swal.fire('¡Error!', error.message, 'error'))
                }
                else if (result.dismiss === Swal.DismissReason.cancel) {
                    map.dibujos.getSource().removeFeature(linea);
                }
            })
    })
}

export const prediosActionRouter = (evt, map, apollo, handler) => {
    // evt is the contextMenu event
    const pixel = map.getEventPixel(evt);
    const predios = map.getCapaById(CAPA_PREDIOS);

    if (!map.capaExisteEnPixel(pixel, predios)) return;

    const coordinate = map.getCoordinateFromPixel(pixel);

    handler.call(null, { coordinate, map, predios, apollo });
}
/** Eliminar */

export const generarDividirPredio = () => ({});
export const generarUnirPredio = () => ({});