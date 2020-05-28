import React from 'react';
import Historial from './puntosControlCalidad/Historial';
import ButtonAction from '../../../ButtonAction';
import { BullhornIcon, MinusIcon } from '../../../../../../lib/icons';
import { type } from '../../../../values';
import { LABEL_HISTORICO_CONTROL_CALIDAD } from './puntosControlCalidad/values';
import { LABEL_OPCIONES } from '../values';

const PanelPuntosControlCalidad = ({ setContenido, propiedades, handleClickAtras, nombreCollapseBtnAtras }) => {

    function handleClickReporterOcurrencias(e) {
        setContenido({ componente: () => <Historial propiedades={propiedades} handleClickAtras={handleClickAtras} nombreCollapseBtnAtras={nombreCollapseBtnAtras} /> });
    }

    return (
        <div className="card border-radius-0">
            <div className="card-header border-primary text-white bg-info px-2 pt-1 pb-2 border-radius-0">
                <strong>{LABEL_OPCIONES}</strong>
                <div className="card-header-actions">
                    <a href="#" className="card-header-action btn-minimize text-light mr-1" data-toggle="collapse"
                        data-target="#carouselExampleIndicators" aria-expanded="false" aria-controls="carouselExampleIndicators">
                        <MinusIcon />
                    </a>
                </div>
            </div>
            <div className="card-body text-white p-1 border-radius-0 border-radius-0 collapse show">
                <div className="row py-2">
                    <div className="col-md-3 p-0 text-center offset-md-1">
                        <ButtonAction type={type.button} title={LABEL_HISTORICO_CONTROL_CALIDAD} className={"btn btn-outline-primary btn-sm border-radius"}
                            data-toggle="collapse" data-target={`#${nombreCollapseBtnAtras}`} aria-expanded="false" aria-controls={nombreCollapseBtnAtras}
                            onClickButton={handleClickReporterOcurrencias}>
                            <BullhornIcon />
                        </ButtonAction>
                        <span className="btn-group text-primary d-block">{LABEL_HISTORICO_CONTROL_CALIDAD}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelPuntosControlCalidad;