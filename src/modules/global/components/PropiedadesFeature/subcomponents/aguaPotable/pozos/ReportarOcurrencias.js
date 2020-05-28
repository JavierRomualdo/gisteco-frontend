import React from 'react';
import { LABEL_REACTIVACION_POZO, LABEL_PARALIZACION_POZO } from './values';
import ButtonAction from '../../../../ButtonAction';
import { type } from '../../../../../values';
import { PlayIcon, StopIcon } from '../../../../../../../lib/icons';
import { LABEL_REPORTAR_OCURRENCIAS } from '../values';
import PanelOpciones from '../../../../Medicion/subcomponents/PanelOpciones';

const ReportarOcurrencias = ({ propiedades, handleClickAtras, nombreCollapseBtnAtras }) => {

    function handleChangeReactivarPozo(dc_id, e) {
        console.log("handleChangeReactivarPozo. dc_id: ", dc_id);
    }

    function handleChangeParalizacionPozo(dc_id, e) {
        console.log("handleChangeParalizacionPozo. dc_id: ", dc_id);
    }

    const { dc_id, nombre } = propiedades;
    return (
        <div>
            <PanelOpciones handleAtras={handleClickAtras} nombreCollapseBtnAtras={nombreCollapseBtnAtras} titulo={`${LABEL_REPORTAR_OCURRENCIAS}: ${nombre}`} />
            <ButtonAction type={type.button} title={LABEL_REACTIVACION_POZO} className={"btn btn-sm  btn-primary mr-2"}
                onClickButton={handleChangeReactivarPozo.bind(null, dc_id)}>
                <PlayIcon /> {LABEL_REACTIVACION_POZO}
            </ButtonAction>
            <ButtonAction type={type.button} title={LABEL_PARALIZACION_POZO} className={"btn btn-sm btn-danger"}
                onClickButton={handleChangeParalizacionPozo.bind(null, dc_id)}>
                <StopIcon /> {LABEL_PARALIZACION_POZO}
            </ButtonAction>
        </div>
    );
}

export default ReportarOcurrencias;