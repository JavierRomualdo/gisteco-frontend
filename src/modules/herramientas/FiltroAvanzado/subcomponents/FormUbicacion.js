import React, { useState, useEffect, useRef } from 'react';
import { Simulate } from 'react-dom/test-utils';
import Select from '../../../global/components/Select';
import { LISTA_PROVINCIAS } from '../../../global/components/OrganizacionTerritorial/values';
import { GET_DISTRITOS_PROVINCIAS } from '../../../global/components/OrganizacionTerritorial/queries';
import { useApolloClient } from 'react-apollo-hooks';

const getDistritos = (apolloClient, idProvincia) => {
    return apolloClient.query({
        fetchPolicy: "network-only",
        query: GET_DISTRITOS_PROVINCIAS,
        variables: { idProvincia: parseInt(idProvincia) }
    })
        .then(({ data }) => data.catastro.getDistritosDeProvincia);
}

export default ({ idProvincia, idDistrito, onChange }) => {

    const [distritos, setDistritos] = useState([]);
    const apolloClient = useApolloClient();
    const distSelectRef = useRef(null);

    useEffect(() => {
        getDistritos(apolloClient, idProvincia)
            .then(dists => setDistritos(dists));
    }, [apolloClient, idProvincia]);

    function handleProvChange(e) {
        onChange(e);
        distSelectRef.current.value = "0";
        Simulate.change(distSelectRef.current);
    }

    return (
        <div className='form'>
            <div className='form-group'>
                <label className='font-weight-bold'>Provincia</label>
                <Select
                    className='form-control form-control-sm'
                    lista={LISTA_PROVINCIAS}
                    value={idProvincia}
                    onChange={handleProvChange}
                    name='idProvincia'
                />
            </div>
            <div className='form-group'>
                <label className='font-weight-bold'>Distrito</label>
                <Select
                    className='form-control form-control-sm'
                    lista={distritos}
                    value={idDistrito}
                    onChange={onChange}
                    name='idDistrito'
                    ref={distSelectRef}
                />
            </div>
        </div>
    )
}