import React, { useState, useEffect } from 'react';
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import TabComponentContainer from '../../global/components/TabComponentContainer';
import AutoCompleteCapas from '../../global/components/AutoCompleteCapas';
import styled from 'styled-components';
import classnames from 'classnames';
import "@webscopeio/react-textarea-autocomplete/style.css";
import { PCHR_INGRESE_EXPRESION_CQL, LABEL_EXPRESION_CQL } from './values';
import { setFiltroCapa } from '../util';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../FilterButtons';
import { withStore } from '../../../pages/Mapa/store/Store';

const resolveFormDataFromCapa = (capa) =>
    !capa ?
        ({ filtroCQL: '' }) :
        ({ filtroCQL: capa.getFilter() || "" }),
    capaInputId = 'capaFiltroCQL';

const resolveFiltroCapa = (capa) => capa ? capa.getFilter() : '';

const PropSuggestionItem = styled.div`
    padding: 2px 10px !important;
    font-size: 13px;
`;

const PropSuggestion = ({ selected, entity: { name, localType } }) => {
    return <PropSuggestionItem>{name} : <span className={selected ? 'text-white' : 'text-muted'}>{localType}</span></PropSuggestionItem>
};

const triggersDefinition = (featureProps) => ({
    ".": {
        dataProvider: token => {
            return featureProps.filter(p => p.name.startsWith(token))
        },
        component: PropSuggestion,
        output: (item) => item.name
    }
});

const FiltroCQL = ({ capa, storeContext: { map } }) => {
    const [, setCQL] = useState(resolveFiltroCapa(capa));
    const [formData, setFormData] = useState(resolveFormDataFromCapa(capa));
    const [capaSeleccionada, setCapaSeleccionada] = useState(capa);
    const [propsList, setPropsList] = useState([]);

    useEffect(() => {
        setCapaSeleccionada(capa);
    }, [capa]);

    useEffect(() => {
        setFormData(resolveFormDataFromCapa(capaSeleccionada));
        if (capaSeleccionada) {
            cargarPropiedadesCapa(capaSeleccionada);
            setCQL(capaSeleccionada.getFilter());
        } else {
            setPropsList([]);
            setCQL('');
        }
    }, [capaSeleccionada]);

    function handleInputChange(e) {
        const filtroCQL = e.target.value;
        setFormData(prevData => ({ ...prevData, filtroCQL }));
    }

    function handleFiltrarButtonClick() {
        setFiltroCapa(capaSeleccionada, formData.filtroCQL);
        setCQL(formData.filtroCQL);
    }

    function handleQuitarFiltroButton() {
        setFiltroCapa(capaSeleccionada, "");
        setCQL('');
        setFormData(prevData => ({ ...prevData, filtroCQL: "" }));
    }

    function cargarPropiedadesCapa(c) {
        c.getFeatureTypeDescription()
            .then(attrs => setPropsList(attrs.featureTypes[0].properties));
    }

    function handleCapaSelect(e) {
        const capaSeleccionada = map.getCapaById(e.value.id);
        setCapaSeleccionada(capaSeleccionada);
    }

    function handleChange() {
        setCapaSeleccionada(null);
    }

    const { filtroCQL } = formData;
    const capaInputText = capaSeleccionada ? capaSeleccionada.get('nombre') : '';

    return <TabComponentContainer>
        <div className='form'>
            <AutoCompleteCapas
                inputId={capaInputId}
                autoFocus={true}
                inputClassName={classnames({ 'is-invalid': !capaSeleccionada })}
                value={capaInputText}
                onSelect={handleCapaSelect}
                onChange={handleChange}
            />
            <div className="form-group">
                <label className="font-weight-bold">{LABEL_EXPRESION_CQL}</label>
                <ReactTextareaAutocomplete
                    className='form-control form-control-sm'
                    loadingComponent={() => <span>Cargando ...</span>}
                    trigger={triggersDefinition(propsList)}
                    placeholder={PCHR_INGRESE_EXPRESION_CQL}
                    onChange={handleInputChange}
                    value={filtroCQL}
                    minChar={0}
                    listStyle={{
                        position: 'absolute',
                        marginTop: '25px'
                    }}
                    containerStyle={{ fontSize: '13px' }}
                    name='filtroCQL'
                />
            </div>
            <ButtonGroup capa={capaSeleccionada} className='mt-2'>
                {() => (<React.Fragment>
                    <FiltrarBtn
                        className='btn-sm'
                        disabled={filtroCQL === capaSeleccionada.getFilter()}
                        onClick={handleFiltrarButtonClick}
                    />
                    <QuitarFiltroBtn
                        className='btn-sm ml-1'
                        visible={capaSeleccionada.getFilter()}
                        onClick={handleQuitarFiltroButton} />
                </React.Fragment>
                )}
            </ButtonGroup>
        </div>
    </TabComponentContainer>
};

export default withStore(FiltroCQL);