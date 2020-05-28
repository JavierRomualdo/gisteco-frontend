import messages from "../../../../lib/messages/messages";
import mapa from "../../../global/components/MapaOL/MapaApi";
import TareasClass from '../../../global/components/Tareas/Tareas.class';
import { FILTRO_CQL, ESTILOS, EXPORTAR_ARCHIVO, FILTRO_GEOMETRICO, FILTRO_AVANZADO } from "../../../global/components/Tareas/mapper";
import { CAPA_TUBERIAS, CAPA_TUBERIAS_ALCANTARILLADO, CAPA_USUARIOS, CAPA_PROBLEMAS, CAPA_PROBLERMAS_COMERCIAL } from "../../../values";
import {
    cambiarValorPropiedadFATuberiaAgua,
    cambiarValorPropiedadFAUsuario,
    cambiarValorPropiedadFAProblemas,
    cambiarValorPropiedadFAProblemasComerial,
    cambiarValorPropiedadFATuberiaAlcantarillado
} from "../../../herramientas/FiltroAvanzado/actions";
import { storeStructureFA } from "../../../herramientas/FiltroAvanzado/values";

export const crearModelMenuContextual = (capa, storeFA, dispatchFA) => {
    const { ely } = capa;
    let menu = [
        {
            label: 'Zoom',
            icon: 'fas fa-search-plus',
            command: () => {
                ely.getBBOX({
                    cql_filter: ely.getFilter(),
                    transform: {
                        source: 'EPSG:32717',
                        destination: 'EPSG:3857'
                    }
                })
                    .then(bbox => {
                        mapa.volarHastaExtension(bbox);
                    });
            }
        }, {
            label: 'Recargar',
            icon: 'fas fa-redo',
            command: () => {
                ely.refresh();
            }
        }, { separator: true },
        {
            label: 'Contar elementos',
            icon: 'fas fa-calculator',
            command: () => {
                ely.countFeatures({ cql_filter: ely.getFilter() })
                    .then(nf => messages.growl.show({ severity: 'info', detail: `${nf} elementos.` }));
            }
        }, {
            label: 'Cambiar estilo',
            icon: 'fas fa-paint-brush',
            command: () => {
                TareasClass.api.abrirTarea({ componenteId: ESTILOS, props: { capa }, reload: true })
            }
        }, {
            label: 'Aplicar filtro CQL',
            icon: 'fas fa-filter',
            command: () => {
                TareasClass.api.abrirTarea({ componenteId: FILTRO_CQL, props: { capa }, reload: true })
            }
        }, {
            label: 'Filtrar por área',
            icon: 'fas fa-filter',
            command: () => {
                TareasClass.api.abrirTarea({ componenteId: FILTRO_GEOMETRICO, props: { capa }, reload: true })
            }
        }
    ];
    (capa.id === CAPA_TUBERIAS || capa.id === CAPA_TUBERIAS_ALCANTARILLADO || capa.id === CAPA_USUARIOS || capa.id === CAPA_PROBLEMAS ||
        capa.id === CAPA_PROBLERMAS_COMERCIAL) && menu.push({
            label: 'Filtro avanzado',
            icon: 'fas fa-filter',
            command: () => {
                TareasClass.api.abrirTarea({ componenteId: FILTRO_AVANZADO, props: { capa }, reload: true })
            }
        });
    ely.getFilter() && menu.push({
        label: 'Quitar filtro',
        icon: 'fas fa-filter',
        command: () => {
            ely.filter('');
            ely.setProperties({ FILTRO_ESPACIAL_KEY: '', FILTRO_AVANZADO_KEY: '' });
            limpiarFiltroAvanzado(capa, storeFA, dispatchFA);
        }
    });
    menu.push(
        { separator: true },
        {
            label: 'Exportar',
            icon: 'fas fa-file-export',
            command: () => {
                TareasClass.api.abrirTarea({ componenteId: EXPORTAR_ARCHIVO, props: { capa }, reload: true })
            }
        });
    return menu;
}

export const esParteDeRuta = (ruta, rutas) => {
    let esParte = false;

    for (let index = 0; index < rutas.length; index++) {
        esParte = rutas[index].includes(ruta);
        if (esParte) break;
    }
    return esParte;
}

const limpiarFiltroAvanzado = (capa, storeFA, dispatchFA) => {
    switch (capa.id) {
        case CAPA_TUBERIAS:
            {
                const { dibujoShape: dibujoShapeTuberia } = storeFA.tuberiaAgua;
                if (dibujoShapeTuberia) mapa.quitarShapeCapaDibujos(dibujoShapeTuberia);
                dispatchFA(cambiarValorPropiedadFATuberiaAgua(storeStructureFA.tuberiaAgua));
            }
            break;
        case CAPA_TUBERIAS_ALCANTARILLADO:
            {
                const { dibujoShape: dibujoShapeTuberiaAlcantarillado } = storeFA.tuberiaAguaAlcantarillado;
                if (dibujoShapeTuberiaAlcantarillado) mapa.quitarShapeCapaDibujos(dibujoShapeTuberiaAlcantarillado);
                dispatchFA(cambiarValorPropiedadFATuberiaAlcantarillado(storeStructureFA.tuberiaAguaAlcantarillado));
            }
            break;
        case CAPA_USUARIOS:
            {
                const { dibujoShape: dibujoShapeUsuario } = storeFA.usuarios;
                if (dibujoShapeUsuario) mapa.quitarShapeCapaDibujos(dibujoShapeUsuario);
                dispatchFA(cambiarValorPropiedadFAUsuario(storeStructureFA.usuarios));
            }
            break;
        case CAPA_PROBLEMAS:
            {
                const { dibujoShape: dibujoShapeProblema } = storeFA.problemas;
                if (dibujoShapeProblema) mapa.quitarShapeCapaDibujos(dibujoShapeProblema);
                dispatchFA(cambiarValorPropiedadFAProblemas(storeStructureFA.problemas));
            }
            break;
        case CAPA_PROBLERMAS_COMERCIAL:
            {
                const { dibujoShape: dibujoShapeProblemaComercial } = storeFA.problemasComercial;
                if (dibujoShapeProblemaComercial) mapa.quitarShapeCapaDibujos(dibujoShapeProblemaComercial);
                dispatchFA(cambiarValorPropiedadFAProblemasComerial(storeStructureFA.problemas));
            }
            break;
        default:
            throw new Error(`No esta especificado la capa ${capa.nombre}.`);
    }
}