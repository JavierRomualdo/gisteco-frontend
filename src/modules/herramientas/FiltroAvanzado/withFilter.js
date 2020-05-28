import React, { useState, useCallback } from 'react';
import { withStore } from "../../../pages/Mapa/store/Store";
import filterBuilders from './filterBuilders';
import { getFiltroAvanzado, setFiltroAvanzado } from '../util';

export default (component, paramsFcn) => {

    const Component = component;

    return withStore(({ storeContext }) => {

        const { capa, capaKey, ...otherParams } = paramsFcn(storeContext);
        const [, setCql] = useState(getFiltroAvanzado(capa) || '');
        const { store, filtroAvanzadoApi } = storeContext;
        //console.log(store.filtroAvanzado);
        const parametros = store.filtroAvanzado[capaKey];
        const filterBuilder = filterBuilders[capaKey];

        const handleChange = useCallback((e) => {
            const target = e.target;
            const name = target.name,
                value = target.type === "checkbox" ? target.checked : target.value;
            filtroAvanzadoApi.cambiarValorParamFiltro(capaKey, { [name]: value });
        }, [capaKey, filtroAvanzadoApi]);

        const handleChangeFilter = useCallback(() => {
            const cqlFilter = filterBuilder(parametros);
            setFiltroAvanzado(capa, cqlFilter);
            setCql(cqlFilter);
        }, [parametros, capa, filterBuilder]);

        const handleRemoveFilter = useCallback(() => {
            setFiltroAvanzado(capa, "");
            setCql('');
        }, [capa]);

        const filtroHaCambiado = useCallback(() =>
            filterBuilder(parametros) !== (getFiltroAvanzado(capa) || ""),
            [parametros, capa, filterBuilder]
        );

        return (
            <Component
                {...otherParams}
                parametros={parametros}
                handleChange={handleChange}
                filtroHaCambiado={filtroHaCambiado()}
                filtered={getFiltroAvanzado(capa)}
                handleChangeFilter={handleChangeFilter}
                handleRemoveFilter={handleRemoveFilter}
            />
        );
    });
}