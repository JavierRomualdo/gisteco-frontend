import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import SelectOption from '../SelectOption';
import { LABEL_PROVINCIA, LABEL_DISTRITO, LISTA_PROVINCIAS } from './values';
import { GET_DISTRITOS_PROVINCIAS } from './queries';

const OrganizacionTerritorial = ({ idProvincia, onChangeProvincia, idDistrito, onChangeDistrito, nameProvincia, nameDistrito, disabled }) => {
    const [distritos, setDistritos] = useState([]);
    const client = useApolloClient();
    function handleChangeProvincia(e) {
        // ACTUALIZA LA PROVINCIA
        let value = e.target.value;
        if (value !== "" && !isNaN(value)) {
            const idProvincia = parseInt(e.target.value);
            // SE LISTA LOS DISTRITOS
            client.query({
                query: GET_DISTRITOS_PROVINCIAS,// BUSCAR_DISTRITOS
                variables: { idProvincia },
                fetchPolicy: "network-only"
            }).then(({ data }) => {
                setDistritos(data.catastro.getDistritosDeProvincia);
            });
        } else {
            setDistritos([]);
        }
        onChangeProvincia(e);
    }

    function handleChangeDistrito(e) {
        onChangeDistrito(e);
    }

    return (
        <div>
            <SelectOption value={idProvincia} etiqueta={LABEL_PROVINCIA} lista={LISTA_PROVINCIAS} onChangeSelect={handleChangeProvincia}
                name={nameProvincia} disabled={disabled} />
            <SelectOption value={idDistrito} etiqueta={LABEL_DISTRITO} lista={distritos} onChangeSelect={handleChangeDistrito}
                name={nameDistrito} disabled={disabled} />
        </div>
    );
}

export default OrganizacionTerritorial;