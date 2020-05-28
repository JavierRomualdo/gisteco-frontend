import React, { useState, useEffect } from 'react';
import TabComponentContainer from '../../global/components/TabComponentContainer';
import RadioButtonPrime from '../../global/components/RadioButtonPrime';
import TextArea from '../../global/components/TextArea';
import { HanPointerIcon, PencilAltIcon } from '../../../lib/icons';
import {
    LABEL_FILTRO_ESPACIAL, LABEL_OBJETOS_FILTRAR_RESPECTO_AREA, LABEL_INTERSECTARLA,
    LABEL_ESTAR_DENTRO, LABEL_COORDENADAS, PCHR_COORDENADAS,
    LABEL_SELECCIONAR_AREA, LABEL_DIBUJAR_FEATURE
} from './values';
import { type, LABEL_CANCELAR } from '../../global/values';
import AutoCompleteCapas from '../../global/components/AutoCompleteCapas';
import classnames from 'classnames';
import { writeFilter } from './util';
import ButtonAction from '../../global/components/ButtonAction';
import FeatureSelector from '../../global/components/FeatureSelector';
import GeoserverLayer from 'easyolmaps/layer/GeoserverLayer';
import { setFiltroGeometrico, getFiltroGeometrico } from '../util';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../FilterButtons';
import FeatureDrawer from '../../global/components/FeatureDrawer';
import { withStore } from '../../../pages/Mapa/store/Store';

const INTERSECTS = 'INTERSECTS',
    WITHIN = 'WITHIN';

const FILTRO_AREA = 'FILTRO_AREA',
    SELECCION_AREA_FILTRO = 'SELECCION_AREA_FILTRO';

const initialFormData = {
    relacionEspacial: INTERSECTS,
    filtroCQL: '',
    aplicarAOtrasCapas: false
};

const resolveFormDataFromCapa = (capa) => !capa ?
    initialFormData :
    ({
        ...initialFormData,
        filtroCQL: getFiltroGeometrico(capa)
    });

const resolveFiltroGeometrico = (capa) => capa ? getFiltroGeometrico(capa) : '';

const capaInputId = 'nombreCapa';

const writeFilterFromFeature = (relacionEspacial, setFormData, ft) => {
    const filtroCQL = writeFilter(relacionEspacial, ft)
    setFormData(prevFormData => ({ ...prevFormData, filtroCQL }));
};

const FiltroGeometrico = ({ capa, storeContext: { map } }) => {

    const [, setCQL] = useState(resolveFiltroGeometrico(capa));
    const [capaSeleccionada, setCapaSeleccionada] = useState(capa);
    const [formData, setFormData] = useState(resolveFormDataFromCapa(capa));

    useEffect(() => {
        setCapaSeleccionada(capa);
    }, [capa]);

    useEffect(() => {
        setFormData(resolveFormDataFromCapa(capaSeleccionada));
        if (capaSeleccionada) {
            setCQL(getFiltroGeometrico(capaSeleccionada));
        } else {
            setCQL('');
        }
    }, [capaSeleccionada]);

    function handleInputChange(e) {
        const prop = e.target.name,
            value = e.target.value;
        setFormData(prevFormData => ({ ...prevFormData, [prop]: value }));
    }

    function handleSelect(e) {
        const capaSeleccionada = map.getCapaById(e.value.id);
        setCapaSeleccionada(capaSeleccionada);
    }
    function handleChange() {
        setCapaSeleccionada(null);
    }
    function handleApplyFilterButton() {
        setFiltroGeometrico(capaSeleccionada, formData.filtroCQL);
        setCQL(formData.filtroCQL);
    }

    function handleRemoveFilterButton() {
        setFiltroGeometrico(capaSeleccionada, "");
        setCQL("");
        setFormData(prevFormData => ({ ...prevFormData, filtroCQL: "" }));
    }

    const { relacionEspacial, filtroCQL } = formData;
    const capaInputText = capaSeleccionada ? capaSeleccionada.get('nombre') : '';

    return (
        <TabComponentContainer>
            <AutoCompleteCapas
                inputId={capaInputId}
                autoFocus={true}
                inputClassName={classnames({ 'is-invalid': !capaSeleccionada })}
                value={capaInputText}
                onSelect={handleSelect}
                onChange={handleChange}
            />
            <h6 className='font-weight-bold'>{LABEL_FILTRO_ESPACIAL}</h6>
            <p>{LABEL_OBJETOS_FILTRAR_RESPECTO_AREA}</p>
            <RadioButtonPrime value={INTERSECTS} inputId="intersectsrb" name={"relacionEspacial"} onChange={handleInputChange} checked={relacionEspacial === INTERSECTS}
                etiqueta={LABEL_INTERSECTARLA} />
            <RadioButtonPrime value={WITHIN} inputId="withinrb" name={"relacionEspacial"} onChange={handleInputChange} checked={relacionEspacial === WITHIN}
                etiqueta={LABEL_ESTAR_DENTRO} />
            <TextArea rows={4} value={filtroCQL} etiqueta={LABEL_COORDENADAS} name='filtroCQL' placeholder={PCHR_COORDENADAS} onChangeInput={handleInputChange} />
            <ButtonGroup capa={capaSeleccionada}>
                {() => (<React.Fragment>
                    <FiltrarBtn
                        className='btn-sm'
                        disabled={filtroCQL === getFiltroGeometrico(capaSeleccionada)}
                        onClick={handleApplyFilterButton} />
                    <QuitarFiltroBtn
                        className='btn-sm ml-1'
                        visible={getFiltroGeometrico(capaSeleccionada)}
                        onClick={handleRemoveFilterButton} />
                    <FeatureSelector
                        tarea={SELECCION_AREA_FILTRO}
                        onFeatureSelected={(ft, finish) => {
                            writeFilterFromFeature(formData.relacionEspacial, setFormData, ft);
                            finish();
                        }}
                        layerFilter={(ly) => {
                            if (!(ly instanceof GeoserverLayer)) return false;
                            return true;
                        }}
                    >
                        {(start, finish, { onProgress }) => {
                            return (
                                <ButtonAction
                                    type={type.button}
                                    className={classnames("btn btn-sm ml-1", { "btn-light": !onProgress, "btn-warning": onProgress })}
                                    onClickButton={() => {
                                        if (onProgress) finish();
                                        else start();
                                    }}
                                >
                                    <HanPointerIcon />
                                    <span className="d-none d-md-inline"> {onProgress ? LABEL_CANCELAR : LABEL_SELECCIONAR_AREA} </span>
                                </ButtonAction>
                            )
                        }}
                    </FeatureSelector>
                    <FeatureDrawer
                        tarea={FILTRO_AREA}
                        shape='Polygon'
                        source={map.dibujos.getSource()}
                        stopClick={true}
                        onDrawEnd={(drawEvt, finish) => {
                            writeFilterFromFeature(formData.relacionEspacial, setFormData, drawEvt.feature);
                            finish();
                        }}
                    >
                        {(start, finish, { active }) => {
                            return (
                                <ButtonAction
                                    type={type.button}
                                    className={classnames("btn btn-sm ml-1", { "btn-light": !active, "btn-warning": active })}
                                    onClickButton={() => {
                                        if (active) finish();
                                        else start({ removePrevious: true });
                                    }}
                                >
                                    <PencilAltIcon />
                                    <span className="d-none d-md-inline"> {active ? LABEL_CANCELAR : LABEL_DIBUJAR_FEATURE} </span>
                                </ButtonAction>
                            );
                        }}
                    </FeatureDrawer>

                </React.Fragment>
                )}
            </ButtonGroup>
        </TabComponentContainer >
    );
};

export default withStore(FiltroGeometrico);