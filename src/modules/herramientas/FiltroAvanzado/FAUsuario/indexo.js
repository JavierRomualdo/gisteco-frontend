import React, { useState, useEffect, useCallback } from 'react';
import { LABEL_UBICACION, LABEL_GEOREFERENCIACION } from '../values';
import { useFAStore } from '../FiltroAvanzadoStore';
import { cambiarValorPropiedadFAUsuario } from '../actions';
import Panel from '../subcomponents/Panel';
import FormUbicacion from '../subcomponents/FormUbicacion';
import { LABEL_SECCION_PREDIO_SERVICIO } from './values';
import FormInfoPredioServicio from '../subcomponents/FormInfoPredioServicio';
import FormInfoGeoreferenciacion from '../subcomponents/FormInfoGeoreferenciacion';
import { getFiltroAvanzado, setFiltroAvanzado } from '../../util';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../../FilterButtons';
import { getFuncionCqlFAUsuario } from '../util';

const filtroHaCambiado = (parametros, cql = "") => {
    const newCql = getFuncionCqlFAUsuario(parametros);
    return newCql !== cql
};

const FAUsuario = ({ capa }) => {
    const [cql, setCQL] = useState(getFiltroAvanzado(capa.ely));

    const faContext = useFAStore();
    const { store, dispatch } = faContext;
    const { usuarios: parametros } = store;
    const { idProvincia, idDistrito, estadoPredio, tipoServicio, categoriaPredio,
        georeferenciadoXGIS, periodoGeorefFechaInf, periodoGeorefFechaSup } = parametros;

    useEffect(() => {
        setCQL(getFiltroAvanzado(capa.ely));
    }, [getFiltroAvanzado(capa.ely)]);

    function handleFiltrarBtn() {
        const filtro = getFuncionCqlFAUsuario(parametros);
        setFiltroAvanzado(capa.ely, filtro);
    }

    function handleQuitarFiltroBtn() {
        setFiltroAvanzado(capa.ely, "");
    }

    const actualizarVariables = useCallback((variables) => {
        dispatch(cambiarValorPropiedadFAUsuario(variables));
    }, [dispatch])

    function handleFormValueChange(e) {
        const target = e.target;
        const name = target.name,
            value = target.type === "checkbox" ? target.checked : target.value;
        actualizarVariables({ [name]: value });
    }

    return (
        <React.Fragment>
            <div className="card mx-1 my-2 border-filtro">
                <div className='form'>
                    <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                        <strong>Capa: {capa.nombre}</strong>
                        <ButtonGroup capa={capa} className='card-header-actions'>
                            {() => {
                                return (
                                    <React.Fragment>
                                        <FiltrarBtn
                                            className='btn-xs'
                                            disabled={!filtroHaCambiado(parametros, cql)}
                                            onClick={handleFiltrarBtn}
                                        />
                                        <QuitarFiltroBtn
                                            className='btn-xs ml-1'
                                            visible={getFiltroAvanzado(capa.ely)}
                                            onClick={handleQuitarFiltroBtn}
                                        />
                                    </React.Fragment>
                                );
                            }}
                        </ButtonGroup>
                    </div>
                    <div className="card-body p-1">
                        <Panel open={true} title={LABEL_UBICACION} id="FAUInfoUbicacion">
                            <FormUbicacion
                                idProvincia={idProvincia}
                                idDistrito={idDistrito}
                                onChange={handleFormValueChange}
                            />
                        </Panel>
                        <Panel title={LABEL_SECCION_PREDIO_SERVICIO} id="FAUInfoPredio">
                            <FormInfoPredioServicio
                                estado={estadoPredio}
                                categoria={categoriaPredio}
                                tipoServicio={tipoServicio}
                                onChange={handleFormValueChange}
                            />
                        </Panel>
                        <Panel title={LABEL_GEOREFERENCIACION} id="FAInfoGeoreferenciacion">
                            <FormInfoGeoreferenciacion
                                periodoGeorefFechaInf={periodoGeorefFechaInf}
                                periodoGeorefFechaSup={periodoGeorefFechaSup}
                                georeferenciadoXGIS={georeferenciadoXGIS}
                                onChange={handleFormValueChange}
                            />
                        </Panel>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default FAUsuario;