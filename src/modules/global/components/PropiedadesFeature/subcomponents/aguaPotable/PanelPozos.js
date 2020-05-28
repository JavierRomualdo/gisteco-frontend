import React from 'react';
import { LABEL_REPORTAR_OCURRENCIAS } from './values';
import { type } from '../../../../values';
import { BullhornIcon, MinusIcon } from '../../../../../../lib/icons';
import ReportarOcurrencias from './pozos/ReportarOcurrencias';
import ButtonAction from '../../../ButtonAction';
import { LABEL_OPCIONES } from '../values';

const PanelPozos = ({ setContenido, propiedades, handleClickAtras, nombreCollapseBtnAtras }) => {

    function handleClickReporterOcurrencias(e) {
        setContenido({
            componente: () => <ReportarOcurrencias propiedades={propiedades} handleClickAtras={handleClickAtras}
                nombreCollapseBtnAtras={nombreCollapseBtnAtras} />
        });
    }

    return (
        <div className="card border-radius-0">
            <div className="card-header border-primary text-white bg-info px-2 pt-1 pb-2 border-radius-0">
                <strong>{LABEL_OPCIONES}</strong>
                <div className="card-header-actions">
                    <a href="#" className="card-header-action btn-minimize text-light mr-1" data-toggle="collapse"
                        data-target="#panelpozos" aria-expanded="false" aria-controls="panelpozos">
                        <MinusIcon />
                    </a>
                </div>
            </div>
            <div id="panelpozos" className="card-body text-white p-1 border-radius-0 border-radius-0 collapse show">
                <div className="row py-2">
                    <div className="col-md-2 p-0 text-center offset-md-1">
                        <ButtonAction type={type.button} title={LABEL_REPORTAR_OCURRENCIAS} className={"btn btn-outline-primary btn-sm border-radius"}
                            data-toggle="collapse" data-target={`#${nombreCollapseBtnAtras}`} aria-expanded="false" aria-controls={nombreCollapseBtnAtras}
                            onClickButton={handleClickReporterOcurrencias}>
                            <BullhornIcon />
                        </ButtonAction>
                        <div className="btn-group text-primary d-block">
                            <span className="d-none d-md-inline"> {LABEL_REPORTAR_OCURRENCIAS} </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanelPozos;