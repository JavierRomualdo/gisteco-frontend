import React, { useState } from 'react';
import InputText from '../../global/components/InputText';
import modal from '../../global/components/Modal';
import ButtonAction from '../../global/components/ButtonAction';
import { type, LABEL_ACEPTAR, LABEL_CANCELAR } from '../../global/values';
import { CheckCircleIcon, BanIcon } from '../../../lib/icons';
import { LABEL_SUMINISTRO, PCHR_SUMINISTRO } from './values';

const AtenderReclamo = () => {
    const [suministro, setSuministro] = useState("");

    function handleChangeInputSuministro(e) {
        setSuministro(e.target.value);
    }

    function handleClickGuardar (e) {
        e.preventDefault();
        console.log(suministro);
    }

    return (
        <form onSubmit={handleClickGuardar}>
            <InputText value={suministro} name="suministro" etiqueta={LABEL_SUMINISTRO} placeholder={PCHR_SUMINISTRO}
                onChangeInput={handleChangeInputSuministro} autoFocus={true} required/>
            <ButtonAction type={type.submit} title={LABEL_ACEPTAR} className={"btn btn-primary btn-sm"} onClickButton={handleClickGuardar}>
                <CheckCircleIcon/> {LABEL_ACEPTAR}
            </ButtonAction>
            <ButtonAction type={type.button} title={LABEL_CANCELAR} className={"btn btn-light btn-sm ml-1"} onClickButton={modal.api.cerrarModal}>
                <BanIcon/> {LABEL_CANCELAR}
            </ButtonAction>
        </form>
    );
}

export default AtenderReclamo;