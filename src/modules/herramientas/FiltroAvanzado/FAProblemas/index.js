import React from 'react';
import {
    LABEL_UBICACION,
    LABEL_SECCION_ATENCION_Y_REGISTRO,
    LABEL_SECCION_CARACTERISTICAS_PROBLEMA
} from '../values';
import FormUbicacion from '../subcomponents/FormUbicacion';
import Panel from '../subcomponents/Panel';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../../FilterButtons';
import FormInfoProblema from '../subcomponents/FormInfoProblema';
import FormAtencionProblema from '../subcomponents/FormAtencionProblema';
import withFilter from '../withFilter';
import { CAPA_PROBLEMAS, CAPA_PROBLERMAS_COMERCIAL } from '../../../values';

const FAProblemas = ({
    area,
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
        tipologia,
        detalle,
        alcance,
        periodoRegistroFechaInf,
        periodoRegistroFechaSup,
        atendido,
        enElPlazo
    } = parametros;

    const title = area === 'OPERACIONAL' ? 'Operacionales' : 'Comerciales';

    return (
        <div className="card mx-1 my-2 border-filtro">
            <div className='form'>
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Problemas {title}</strong>
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
                    <Panel open={true} title={LABEL_UBICACION} id="FAPInfoUbicacion">
                        <FormUbicacion
                            idProvincia={idProvincia}
                            idDistrito={idDistrito}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_SECCION_CARACTERISTICAS_PROBLEMA} id="FAPInfoProblema">
                        <FormInfoProblema
                            area={area.toUpperCase()}
                            tipologia={tipologia}
                            detalle={detalle}
                            alcance={alcance}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_SECCION_ATENCION_Y_REGISTRO} id="FAPInfoAtencion">
                        <FormAtencionProblema
                            atendido={atendido}
                            enElPlazo={enElPlazo}
                            periodoRegistroFechaInf={periodoRegistroFechaInf}
                            periodoRegistroFechaSup={periodoRegistroFechaSup}
                            onChange={handleChange}
                        />
                    </Panel>
                </div>
            </div>
        </div>
    );
};

export const FAProblemasOperacionales = withFilter(FAProblemas, ({ map }) => ({
    capa: map.getCapaById(CAPA_PROBLEMAS),
    capaKey: 'problemasOperacionales',
    area: 'OPERACIONAL'
}));

export const FAProblemasComerciales = withFilter(FAProblemas, ({ map }) => ({
    capa: map.getCapaById(CAPA_PROBLERMAS_COMERCIAL),
    capaKey: 'problemasComerciales',
    area: 'COMERCIAL'
}));