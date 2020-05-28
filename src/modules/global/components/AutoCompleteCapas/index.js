import React, { useState, useEffect, } from 'react';
import AutoCompleteInput from '../AutoComplete';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import { LISTA_CAPAS_USUARIO } from './queries';
import Fuse from 'fuse.js';
import { fuseOptions } from './config';

/*
    Para que autofocus funcione se debe asignar un Id al input
    usando la propiedad 'inputId',
    ver Componente FiltroCQL.

    Utiliza la propiedad 'onSelect' para configurar el
    listener que retornará la capa seleccionada.

    El objeto que representa la capa seleccionada
    tiene los siguientes campos:
    -id
    -nombre
    -nombre_geoserver
    -ely => easyolmaps/layer/GeoserverLayer
*/

const AutoCompleteCapasDef = ({ listaCapas, autoFocus, onChange, value, ...restProps }) => {
    const [inputText, setInputText] = useState(value);
    const [sugerencias, setSugerencias] = useState([]);
    const [fuse] = useState(new Fuse(listaCapas, fuseOptions));
    const { inputId } = restProps;

    useEffect(() => {
        const input = document.getElementById(inputId);
        if (autoFocus && inputId) input.focus();
    }, [autoFocus, inputId]);

    useEffect(() => {
        if (value) setInputText(value);
    }, [value]);

    function handleCompleteMethod(e) {
        const results = fuse.search(e.query);
        setSugerencias(results);
    }

    return <AutoCompleteInput
        etiqueta='Capa'
        placeholder='Ingrese nombre capa'
        suggestions={sugerencias}
        completeMethod={handleCompleteMethod}
        field={"nombre"}
        value={inputText}
        onChange={e => {
            setInputText(e.value);
            onChange && onChange.call(null, e);
        }}
        {...restProps}
    />
};

const AutoCompleteCapas = styled(AutoCompleteCapasDef)`
    & .p-autocomplete-input.is-invalid,
    & .p-autocomplete-input.is-invalid:hover {
        border-color: #dc3545;
    }
    & .p-autocomplete-input.is-invalid:focus{
        border-color: #dc3545;
        box-shadow: 0 0 0 .2rem rgba(220,53,69,.25);
    }
`;

export default (props) => {
    return (
        <Query
            query={LISTA_CAPAS_USUARIO}
        >
            {({ data, loading, error }) => {
                let listaCapas = [];
                const placeholder = loading ? 'Cargando...' : (error ? error.message : 'Ingrese el nombre de la capa');
                if (data) listaCapas = data.sistema.listaCapas || [];

                return (
                    <AutoCompleteCapas
                        {...props}
                        placeholder={placeholder}
                        disabled={loading || error}
                        listaCapas={listaCapas}
                    />
                )
            }}
        </Query>
    );
}