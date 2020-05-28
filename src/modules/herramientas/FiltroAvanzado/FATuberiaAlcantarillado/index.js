import React from 'react';
import { LABEL_UBICACION, LABEL_TUBERIA, LABEL_ANTIGUEDAD } from '../values';
import { ButtonGroup, FiltrarBtn, QuitarFiltroBtn } from '../../FilterButtons';
import Panel from '../subcomponents/Panel';
import FormUbicacion from '../subcomponents/FormUbicacion';
import FormPropiedadesTuberiaAlcantarillado from '../subcomponents/FormPropiedadesTuberiaAlcantarillado';
import FormAntiguedadTuberia from '../subcomponents/FormAntiguedadTuberia';
import { CAPA_TUBERIAS_ALCANTARILLADO } from '../../../values';
import withFilter from '../withFilter';

const FATuberiaAlcantarillado = ({
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
        tipo,
        material,
        aniosAntiguedad,
        anioInicial,
        anioFinal,
        filtrarPorIntervalo
    } = parametros;

    return (
        <div className="card mx-1 my-2 border-filtro">
            <div className='form'>
                <div className="card-header px-2 pt-1 pb-2 bg-filtro font-size-titulo">
                    <strong>Tuberías de alcantarillado</strong>
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
                    <Panel open={true} title={LABEL_UBICACION} id="tuberiaACLugares">
                        <FormUbicacion
                            idProvincia={idProvincia}
                            idDistrito={idDistrito}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_TUBERIA} id="tuberiaACPropiedades">
                        <FormPropiedadesTuberiaAlcantarillado
                            tipo={tipo}
                            material={material}
                            onChange={handleChange}
                        />
                    </Panel>
                    <Panel title={LABEL_ANTIGUEDAD} id="tuberiaACAntiguedad">
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

export default withFilter(FATuberiaAlcantarillado, ({ map }) => ({
    capa: map.getCapaById(CAPA_TUBERIAS_ALCANTARILLADO),
    capaKey: 'tuberiasAlcantarillado'
}));