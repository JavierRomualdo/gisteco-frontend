import {
    ESTILOS,
    FILTRO_CQL,
    FILTRO_GEOMETRICO,
    FILTRO_AVANZADO,
    EXPORTAR_CAPA
} from "../../../../pages/Mapa/store/tareas/mapper";
import { setFiltroCapa } from "../../../herramientas/util";
import Swal from "sweetalert2";
import { OpcionMenu } from "../../../../pages/Mapa/casl/ability";


const Toast = Swal.mixin({
    icon: 'info',
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
        container: 'container-class'
    },
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const crearMenuContextual = (capa, { map, tareasApi }, ability) => {
    const model = [
        {
            label: 'Zoom',
            icon: 'fas fa-search-plus',
            command: () => {
                capa.getBBOX({
                    cql_filter: capa.getFilter(),
                    transform: {
                        source: 'EPSG:32717',
                        destination: map.codeProjection
                    }
                })
                    .then(bbox => {
                        map.volarHastaExtension(bbox);
                    })
                    .catch(error => Swal.fire('¡Algo salió mal! :(', error.message, "error"));
            }
        },
        {
            label: 'Recargar',
            icon: 'fas fa-redo',
            command: () => {
                capa.refresh();
            }
        },
        {
            separator: true
        },
        {
            label: 'Contar elementos',
            icon: 'fas fa-calculator',
            command: () => {
                capa.countFeatures({ cql_filter: capa.getFilter() })
                    .then(nf => {
                        Toast.fire({ title: `${nf} elemento(s)` })
                    })
                    .catch(error => Swal.fire('¡Algo salió mal! :(', error.message, "error"));
            }
        },
        {
            label: 'Cambiar estilo',
            icon: 'fas fa-paint-brush',
            command: () => {
                tareasApi.cerrarTarea(ESTILOS);
                tareasApi.abrirTarea({ componenteId: ESTILOS, props: { capa }, reload: true })
            }
        },
        {
            separator: true
        },
        {
            label: 'Aplicar filtro CQL',
            icon: 'fas fa-filter',
            command: () => {
                tareasApi.abrirTarea({ componenteId: FILTRO_CQL, props: { capa }, reload: true })
            }
        },
        {
            label: 'Filtrar por área',
            icon: 'fas fa-filter',
            command: () => {
                tareasApi.abrirTarea({ componenteId: FILTRO_GEOMETRICO, props: { capa }, reload: true })
            }
        },
        {
            label: 'Filtro avanzado',
            icon: 'fas fa-filter',
            command: () => {
                tareasApi.abrirTarea({ componenteId: FILTRO_AVANZADO, props: { capa }, reload: true })
            }
        }
    ];

    if (capa.getFilter()) {
        model.push({
            label: 'Quitar filtro',
            icon: 'fas fa-filter',
            command: () => {
                setFiltroCapa(capa, '');
            }
        })
    };

    if (ability.can('read', new OpcionMenu({ id: "38" }))) {
        model.push(
            {
                separator: true
            },
            {
                label: 'Exportar',
                icon: 'fas fa-file-export',
                command: () => {
                    tareasApi.abrirTarea({ componenteId: EXPORTAR_CAPA, props: { capa }, reload: true })
                }
            }
        )
    };

    return model;
}