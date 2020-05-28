import {
    REGISTRAR_CLANDESTINO,
    FORMULARIO_GEOREFERENCIAR_USUARIO,
    AGREGAR_MARCADOR
} from "../../../../pages/Mapa/store/tareas/mapper";
import ObtenerCoordenadas from "../../../catastro/components/ObtenerCoordenadas";
import {
    CAPA_USUARIOS,
    CAPA_USUARIOS_SIN_SUMINISTRO,
    CAPA_PREDIOS
} from "../../../values";
import CodigoCatastral from "../../../catastro/components/CodigoCatastral";
import {
    dividirPredio,
    unirPredio,
    prediosActionRouter
} from "./util";

import { OpcionMenu } from '../../../../pages/Mapa/casl/ability';
import { toLonLat } from "ol/proj";

const blur = (e) => e.originalEvent.currentTarget.blur();

export const crearMenuContextual = (evt, { map, tareasApi, sidebarApi, streetViewApi }, apollo, ability) => {

    evt.persist();
    const pixel = map.getEventPixel(evt);
    const capa = map.getCapaGeoserverAtPixel(pixel),
        idCapa = capa ? capa.get('id') : null;

    const model = [
        {
            label: 'Recargar capas',
            icon: 'fas fa-redo',
            command: (e) => {
                blur(e);
                map.capasActivas.forEach(ly => ly.refresh());
            }
        },
        {
            label: 'Ver StreetView aquí',
            icon: 'fa fa-street-view',
            command: (e) => {
                blur(e);
                const [lng, lat] = toLonLat(map.getEventCoordinate(evt));
                sidebarApi.abrirSidebar('STREET_VIEW');
                streetViewApi.setOptions({ position: { lng, lat } });
            }
        },
        {
            label: 'Limpiar mapa',
            icon: 'fas fa-brush',
            command: (e) => {
                blur(e);
                map.limpiarDibujos();
                map.limpiarSeleccionados();
            }
        }
    ];

    if (ability.can('read', new OpcionMenu({ id: "25" }))) {
        model.push({
            label: 'Georeferenciar usuario',
            icon: 'fas fa-map-marked-alt',
            command: (e) => {
                blur(e);
                const markerInitPos = map.getEventCoordinate(evt);
                tareasApi.abrirTarea({
                    componenteId: FORMULARIO_GEOREFERENCIAR_USUARIO,
                    props: { markerInitPos },
                    reload: true
                })
            }
        });
    }

    if (
        (idCapa === CAPA_USUARIOS || idCapa === CAPA_USUARIOS_SIN_SUMINISTRO) &&
        ability.can('read', new OpcionMenu({ id: "35" }))
    ) {
        model.push({
            label: 'Obtener código catastral',
            icon: 'fas fa-barcode',
            command: (e) => {
                blur(e);
                const coordinate = map.getCoordinateFromPixel(pixel);
                capa.getFeaturesAtCoordinate(
                    coordinate,
                    map, null,
                    {
                        dataProjection: 'EPSG:32717',
                        featureProjection: map.codeProjection
                    })
                    .then(([ft]) => {
                        ft.set('capa', capa);
                        map.agregarASeleccionados([ft], true);
                        map.popup.open(coordinate, {
                            titulo: 'Código catastral',
                            component: CodigoCatastral,
                            props: {
                                suministro: ft.get('suministro'),
                                gid: ft.get('gid')
                            }
                        });
                    })
            }
        })
    };

    if (idCapa === CAPA_PREDIOS) {
        if (ability.can('read', new OpcionMenu({ id: "33" }))) {
            model.push({
                label: 'Dividir predio',
                icon: 'fas fa-cut',
                command: (e) => {
                    blur(e);
                    prediosActionRouter(evt, map, apollo, dividirPredio);
                }
            });
        }
        if (ability.can('read', new OpcionMenu({ id: "34" }))) {
            model.push({
                label: 'Unir predios',
                icon: 'fas fa-vector-square',
                command: (e) => {
                    blur(e);
                    prediosActionRouter(evt, map, apollo, unirPredio);
                }
            })
        }
    };

    model.push(
        {
            label: 'Registrar intervención clandestino',
            icon: 'fas fa-pen',
            command: (e) => {
                blur(e);
                const markerInitPos = map.getCoordinateFromPixel(pixel);
                tareasApi.abrirTarea({
                    componenteId: REGISTRAR_CLANDESTINO,
                    props: { markerInitPos },
                    reload: true
                })
            }
        },
        {
            label: 'Agregar marcador',
            icon: 'fas fa-map-marker-alt',
            command: (e) => {
                blur(e);
                const markerInitPos = map.getCoordinateFromPixel(pixel);
                tareasApi.abrirTarea({
                    componenteId: AGREGAR_MARCADOR,
                    props: { markerInitPos },
                    reload: true
                })
            }
        }
        ,
        {
            label: 'Obtener coordenadas',
            icon: 'fas fa-list-ol',
            command: (e) => {
                blur(e);
                const evtCoordinate = map.getCoordinateFromPixel(pixel);

                map.popup.open(evtCoordinate, {
                    titulo: 'Coordenadas',
                    component: ObtenerCoordenadas,
                    props: {
                        coordinate: evtCoordinate
                    }
                });
            }
        }
    );

    return model;
}