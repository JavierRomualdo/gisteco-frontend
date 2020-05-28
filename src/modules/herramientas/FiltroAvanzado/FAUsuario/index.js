import React from 'react';
import withFilter from '../withFilter';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../../FilterButtons';
import Panel from '../subcomponents/Panel';
import FormUbicacion from '../subcomponents/FormUbicacion';
import FormInfoPredioServicio from '../subcomponents/FormInfoPredioServicio';
import FormInfoGeoreferenciacion from '../subcomponents/FormInfoGeoreferenciacion';
import { CAPA_USUARIOS } from '../../../values';
import { LABEL_UBICACION, LABEL_GEOREFERENCIACION } from '../values';
import { LABEL_SECCION_PREDIO_SERVICIO } from './values';

const FiltroUsuario = ({
    parametros,
    handleChange,
    filtroHaCambiado,
    filtered,
    handleChangeFilter,
    handleRemoveFilter
}) => {

    const {
        idProvincia,
        idDistrito,
        estadoPredio,
        categoriaPredio,
        tipoServicio,
        periodoGeorefFechaInf,
        periodoGeorefFechaSup,
        georeferenciadoXGIS
    } = parametros;

    return (
        <div className="card mx-1 my-2 border-filtro">
            <div className='form'>
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Usuarios</strong>
                    <ButtonGroup capa={true} className='card-header-actions'>
                        {() => {
                            return (
                                <React.Fragment>
                                    <FiltrarBtn
                                        className='btn-xs'
                                        disabled={!filtroHaCambiado}
                                        onClick={handleChangeFilter}
                                    />
                                    <QuitarFiltroBtn
                                        className='btn-xs ml-1'
                                        visible={filtered}
                                        onClick={handleRemoveFilter}
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
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_SECCION_PREDIO_SERVICIO} id="FAUInfoPredio">
                        <FormInfoPredioServicio
                            estado={estadoPredio}
                            categoria={categoriaPredio}
                            tipoServicio={tipoServicio}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_GEOREFERENCIACION} id="FAInfoGeoreferenciacion">
                        <FormInfoGeoreferenciacion
                            periodoGeorefFechaInf={periodoGeorefFechaInf}
                            periodoGeorefFechaSup={periodoGeorefFechaSup}
                            georeferenciadoXGIS={georeferenciadoXGIS}
                            onChange={handleChange}
                        />
                    </Panel>
                </div>
            </div>
        </div>
    );
};

export default withFilter(FiltroUsuario, ({ map }) => ({
    capa: map.getCapaById(CAPA_USUARIOS),
    capaKey: 'usuarios'
}));