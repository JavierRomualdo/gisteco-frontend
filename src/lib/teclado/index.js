import SidebarMapClass from "../../modules/global/components/SidebarMap/SidebarMap.class";
import MapaApi from "../../modules/global/components/MapaOL/MapaApi";
import { CAPAS, TAREAS } from "../../modules/global/components/SidebarMap/mapper";

export const keyMap = {
    abrirSidebar: 'alt+up',
    abrirTareas: 'alt+t',
    cerrarSidebar: 'alt+down',
    redimensionarSiderbar: 'alt+enter',
    limpiarMapa: 'alt+l'
}

export const handlers = {
    'abrirSidebar': () => SidebarMapClass.api.abrirSidebar(CAPAS),
    'abrirTareas': () => SidebarMapClass.api.abrirSidebar(TAREAS),
    'cerrarSidebar': () => SidebarMapClass.api.cerrarSidebar(),
    'redimensionarSiderbar': () => SidebarMapClass.api.redimensionarSidebar(),
    'limpiarMapa': () => MapaApi.limpiarSeleccionados()
};
