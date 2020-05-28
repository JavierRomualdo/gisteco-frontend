import { OPCIONES_AUTORIZADAS_MENU, CAPAS_AUTORIZADAS, INFORMES_AUTORIZADOS } from "./queries";
import { CONCEDER_PERMISOS_MENU, QUITAR_PERMISOS_MENU, CONCEDER_PERMISO_A_CAPAS, QUITAR_PERMISO_A_CAPAS, CONCEDER_PERMISO_A_INFORMES_CAPAS, QUITAR_PERMISO_A_INFORMSE_CAPAS } from "./mutations";

export const getOpcionesAutorizadas = (apollo, variables) => {
    return apollo.query({
        fetchPolicy: "network-only",
        query: OPCIONES_AUTORIZADAS_MENU,
        variables
    }).then(({ data }) => data.sistema.opcionesMenuAutorizadasUsuario);
}

export const concederPermisoMenus = (apollo, variables) => {
    return apollo.mutate({
        mutation: CONCEDER_PERMISOS_MENU,
        variables
    }).then(({ data }) => data.sistema.concedido)
}

export const quitarPermisoMenus = (apollo, variables) => {
    return apollo.mutate({
        mutation: QUITAR_PERMISOS_MENU,
        variables
    }).then(({ data }) => data.sistema.quitado);
}

export const getCapasAutorizadas = (apollo, variables) => {
    return apollo.query({
        fetchPolicy: "network-only",
        query: CAPAS_AUTORIZADAS,
        variables
    }).then(({ data }) => data.sistema.capasAutorizadasUsuario);
}

export const concederPermisoACapas = (apollo, variables) => {
    return apollo.mutate({
        mutation: CONCEDER_PERMISO_A_CAPAS,
        variables
    }).then(({ data }) => data.sistema.concedido);
}

export const quitarPermisoACapas = (apollo, variables) => {
    return apollo.mutate({
        mutation: QUITAR_PERMISO_A_CAPAS,
        variables
    }).then(({ data }) => data.sistema.quitado);
}

export const getInformesCapasAutorizados = (apollo, variables) => {
    return apollo.query({
        fetchPolicy: 'network-only',
        query: INFORMES_AUTORIZADOS,
        variables
    }).then(({ data }) => data.sistema.informesCapaAutorizadosUsuario)
};

export const concederPermisoAInformesCapas = (apollo, variables) => {
    return apollo.mutate({
        mutation: CONCEDER_PERMISO_A_INFORMES_CAPAS,
        variables
    }).then(({ data }) => data.sistema.concedido);
};

export const quitarPermisoAInformesCapas = (apollo, variables) => {
    return apollo.mutate({
        mutation: QUITAR_PERMISO_A_INFORMSE_CAPAS,
        variables
    }).then(({ data }) => data.sistema.quitado);
};