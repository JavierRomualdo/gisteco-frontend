import { FILTRO_USUARIOS } from "./queries"

export const getUsuarios = (apollo, variables) => {
    return apollo.query({
        query: FILTRO_USUARIOS,
        variables
    }).then(({ data }) => data.sistema.usuarios);

}