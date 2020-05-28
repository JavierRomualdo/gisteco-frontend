import React, { useState } from 'react';
import { ValidationForm } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import InputGroup from '../InputGroup';
import ButtonAction from '../ButtonAction';
import { type, LABEL_REGRESAR, MSJ_INGRESE_CORREO_ELECTRONICO, LABEL_ENVIAR, LABEL_CORREO_ELECTRONICO } from '../../values';
import { LABEL_SOLICITAR_RECUPERACION_CONTRASENA } from './values';
import { MailIcon, EnvelopeIcon, CaretLetIcon, LoadingIconChange } from '../../../../lib/icons';


const FormularioSolicitarRecuperacionContrasena = ({ handleClickAtrar }) => {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [loading] = useState(false);
    const formRef = React.createRef();

    function handleInputChangeCorreoElectronico(e) {
        setCorreoElectronico(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // setLoading(true);
    }

    return (
        <ValidationForm onSubmit={handleSubmit} ref={formRef} immediate={true} setFocusOnError={true}>
            <div className="card-header p-1">
                <button className="btn btn-primary btn-sm mr-1" type={type.button} onClick={handleClickAtrar} title={LABEL_REGRESAR}>
                    <CaretLetIcon />
                </button>
                <strong>{LABEL_SOLICITAR_RECUPERACION_CONTRASENA}</strong>
                <div className="card-header-actions">
                    <ButtonAction type={type.submit} title={LABEL_ENVIAR} className="btn btn-primary btn-sm mr-1">
                        <EnvelopeIcon />
                        <span className="d-none d-md-inline"> {LABEL_ENVIAR} </span>
                        {loading && <LoadingIconChange tamanio="fa-xs" color="text-white" />}
                    </ButtonAction>
                </div>
            </div>
            <div className="card-body">
                <InputGroup type={type.text} placeholder={LABEL_CORREO_ELECTRONICO} onChange={handleInputChangeCorreoElectronico} id="correo"
                    value={correoElectronico} label={LABEL_CORREO_ELECTRONICO} required autoFocus={true} validator={validator.isEmail}
                    className="form-control form-control-sm"
                    errorMessage={{ required: MSJ_INGRESE_CORREO_ELECTRONICO, pattern: '', validator: "Ingrese un correo válido" }}>
                    <MailIcon />
                </InputGroup>
            </div>
        </ValidationForm>
    );
}

export default FormularioSolicitarRecuperacionContrasena;