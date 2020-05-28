import React, { useState } from 'react';
import { ValidationForm } from "react-bootstrap4-form-validation";
import { useApolloClient } from 'react-apollo-hooks';
import { NUMBER_REGEXP, CARACTERES_6_AND_12_REGEXP, TAG_DNI, type } from '../../../global/values';
import { IdCardIcon, LockOpenIcon, EditIcon, LoadingIconChange } from '../../../../lib/icons';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import ButtonAction from '../../../global/components/ButtonAction';
import InputGroup from '../../../global/components/InputGroup';
import { MSJ_SE_HA_CAMBIADO_CONTRASEÑA, PCHR_INGRESAR_DNI, MSJ_INGRESE_NUMERO_DOCUMENTO, LABEL_CONTRASENA_ACTUAL,
    MSJ_INGRESE_CONTRASENA_ACTUAL, MSJ_CONTRASENA_ENTRE_6_AND_12_CARACTERES, LABEL_NUEVA_CONTRASENA,
    MSJ_INGRESE_NUEVA_CONTRASENA, PCHR_REPETIR_CONTRASENA, LABEL_REPETIR_CONTRASENA, MSJ_REPITA_NUEVA_CONTRASENA,
    MSJ_CONTRASENAS_NO_COINCIDEN, LABEL_CAMBIAR_CONTRASENA } from './values';
import { CAMBIAR_CONTRASENA_USUARIO } from './mutations';

export default () => {
    const [dniUsuario,setDniUsuario] = useState('');
    const [contraseniaActual,setContrasenaActual] = useState('');
    const [nuevaContrasenia,setContrasenaNueva] = useState('');
    const [contrasenaRepetida,setContrasenaRepetida] = useState('');
    const [mensaje,setMensaje] = useState(mensajeInicial);
    const [loading, setLoading] = useState(false);
    const [formRef] = useState(React.createRef());
    const client = useApolloClient();

    function handleInputChangeDni(e) {
        const value = e.target.value;
        if (!NUMBER_REGEXP.test(value)) return;
        setDniUsuario(value);
    }

    function handleInputChangeContrasenaActual(e) {
        const value = e.target.value;
        setContrasenaActual(value);
    }

    function handleInputChangeContrasenaNueva(e) {
        const value = e.target.value;
        setContrasenaNueva(value);
    }

    function handleInputChangeContrasenaRepetida(e) {
        const value = e.target.value;
        setContrasenaRepetida(value);
    }

    function handleMatchPassword(value) {
        return value && value === nuevaContrasenia;
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMensaje(mensajeInicial);
        client.mutate({
            mutation: CAMBIAR_CONTRASENA_USUARIO,
            variables: {dniUsuario, contraseniaActual, nuevaContrasenia},
        }).then((data) => {
            const { cambiarContraseniaUsuario } = data.data.sistema;
            if (cambiarContraseniaUsuario) {
                setMensaje({texto: MSJ_SE_HA_CAMBIADO_CONTRASEÑA, tipo: TIPO_ALERTA.EXITO});
                limpiarFormulario();
            }
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        }).finally(()=>{
            setLoading(false);
        });
    }

    function limpiarFormulario() {
        let ref = formRef.current;
        ref.resetValidationState({ immediate: true, setFocusOnError: true, clearInputOnReset: false });
        setDniUsuario('');
        setContrasenaActual('');
        setContrasenaNueva('');
        setContrasenaRepetida('');
    }

    return (
        <TabComponentContainer>
            <ValidationForm  onSubmit={handleSubmit} ref={formRef} immediate={true} setFocusOnError={true}>
                <InputGroup type={type.text} placeholder={PCHR_INGRESAR_DNI} onChange={handleInputChangeDni} id="dnicamcont" value={dniUsuario}
                    autoFocus={true} label={TAG_DNI} required pattern="\d{8}" className="form-control form-control-sm" maxLength="8"
                    errorMessage={{required: MSJ_INGRESE_NUMERO_DOCUMENTO, pattern:''}}>
                    <IdCardIcon/>
                </InputGroup>
                <InputGroup type={type.password} placeholder={LABEL_CONTRASENA_ACTUAL} onChange={handleInputChangeContrasenaActual} id="passwordActual"
                value={contraseniaActual} label={LABEL_CONTRASENA_ACTUAL} required pattern={CARACTERES_6_AND_12_REGEXP} className="form-control form-control-sm"
                errorMessage={{required: MSJ_INGRESE_CONTRASENA_ACTUAL, pattern: MSJ_CONTRASENA_ENTRE_6_AND_12_CARACTERES}}>
                    <LockOpenIcon/>
                </InputGroup>
                <InputGroup type={type.password} placeholder={LABEL_NUEVA_CONTRASENA} onChange={handleInputChangeContrasenaNueva} id="passwordNueva"
                value={nuevaContrasenia} label={LABEL_NUEVA_CONTRASENA} required pattern={CARACTERES_6_AND_12_REGEXP} className="form-control form-control-sm"
                errorMessage={{required: MSJ_INGRESE_NUEVA_CONTRASENA, pattern: MSJ_CONTRASENA_ENTRE_6_AND_12_CARACTERES}}>
                    <LockOpenIcon/>
                </InputGroup>
                <InputGroup type={type.password} placeholder={PCHR_REPETIR_CONTRASENA} onChange={handleInputChangeContrasenaRepetida} id="passwordRepite"
                    value={contrasenaRepetida} label={LABEL_REPETIR_CONTRASENA} pattern={CARACTERES_6_AND_12_REGEXP} validator={handleMatchPassword}
                    errorMessage={{required: MSJ_REPITA_NUEVA_CONTRASENA, pattern: MSJ_CONTRASENA_ENTRE_6_AND_12_CARACTERES, validator: MSJ_CONTRASENAS_NO_COINCIDEN}}
                    className="form-control form-control-sm" required>
                    <LockOpenIcon/>
                </InputGroup>
                <ButtonAction type={type.submit} title={LABEL_CAMBIAR_CONTRASENA} className="btn btn-primary btn-sm mb-3">
                    <EditIcon/>
                    <span className="d-none d-md-inline"> {LABEL_CAMBIAR_CONTRASENA} </span>
                    {loading && <LoadingIconChange tamanio="fa-xs" color="text-white"/>}
                </ButtonAction>
                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            </ValidationForm>
        </TabComponentContainer>
    );
}