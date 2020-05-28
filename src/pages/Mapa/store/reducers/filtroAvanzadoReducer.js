import { CAMBIAR_VALOR_PARAM_FILTRO } from "../actions";

export default (state, action) => {
    const filtroActual = state.filtroAvanzado;

    switch (action.type) {
        case CAMBIAR_VALOR_PARAM_FILTRO:
            return {
                ...state,
                filtroAvanzado: {
                    ...filtroActual,
                    [action.capa]: {
                        ...filtroActual[action.capa],
                        ...action.params
                    }
                }
            };
        default:
            throw new Error('Acción desconocida');
    }
}