import React from 'react';
import FormUbicacion from '../subcomponents/FormUbicacion';
import { ButtonGroup, QuitarFiltroBtn, FiltrarBtn } from '../../FilterButtons';
import FormPropiedadesTuberia from '../subcomponents/FormPropiedadesTuberia';
import FormAntiguedadTuberia from '../subcomponents/FormAntiguedadTuberia';
import Panel from '../subcomponents/Panel';
import { LABEL_TUBERIA, LABEL_UBICACION, LABEL_ANTIGUEDAD } from '../values';
import withFilter from '../withFilter';
import { CAPA_TUBERIAS } from '../../../values';

const FATuberiaAgua = ({
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
        material,
        funcion,
        tipo,
        aniosAntiguedad,
        filtrarPorIntervalo,
        anioInicial,
        anioFinal
    } = parametros;

    return (

        <div className="card mx-2 mt-3 mb-2 border-filtro">
            <div className='form'>
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Tuberías de agua</strong>
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
                <div className="card-body p-2">
                    <Panel open={true} title={LABEL_UBICACION} id="tuberiaLugares">
                        <FormUbicacion
                            idProvincia={idProvincia}
                            idDistrito={idDistrito}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_TUBERIA} id="tuberiaPropiedades">
                        <FormPropiedadesTuberia
                            tipo={tipo}
                            material={material}
                            funcion={funcion}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_ANTIGUEDAD} id="tuberiaAntiguedad">
                        <FormAntiguedadTuberia
                            aniosAntiguedad={aniosAntiguedad}
                            anioInicial={anioInicial}
                            anioFinal={anioFinal}
                            filtrarPorIntervalo={filtrarPorIntervalo}
                            onChange={handleChange}
                        />
                    </Panel>
                </div>
            </div>
        </div>
    );
}

export default withFilter(FATuberiaAgua, ({ map }) => ({
    capa: map.getCapaById(CAPA_TUBERIAS),
    capaKey: 'tuberiasAgua'
}));