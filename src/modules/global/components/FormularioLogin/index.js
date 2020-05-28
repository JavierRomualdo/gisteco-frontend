import React, { useState } from 'react';
import auth from '../../../../lib/auth';
import classnames from 'classnames';
import './estilos.css';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import user from '..//../../../assets/img/user.png';
import { ValidationForm } from 'react-bootstrap4-form-validation';
import InputGroup from '../InputGroup';
import ButtonAction from '../ButtonAction';
import CardInfoSession from '../CardInfoSession';
import { UserIcon, UnlockAltIcon, LoadingIconChange } from '../../../../lib/icons';
import FormularioSolicitarUsuario from '../FormularioSolicitarUsuario';
import { type, LABEL_SISTEMA_INFORMACION_GEOGRAFICA, LABEL_EPS_GRAU_SA } from '../../values';
import {
    LABEL_INICIAR_SESION, MSJ_INGRESE_NOMBRE_USUARIO, MSJ_INGRESE_CONTRASENA,
    initialState, PCHR_USUARIO, PCHR_CONTRASENA
} from './values';

const FormularioLogin = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [state, setState] = useState(initialState);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [mostrarLogin, setMostrarLogin] = useState(true);
    const formRef = React.createRef();

    function handleChangeMostrarSolicitarUser(e) {
        setMostrarLogin(false);
    }

    function handleChangeAtras(e) {
        setMostrarLogin(true);
    }

    function handleChangeUsuario(e) {
        setUsuario(e.target.value);
    }

    function handleChangeContrasena(e) {
        setContrasena(e.target.value);
    }

    function handleSubmitIniciarSesion(e) {
        e.preventDefault();
        setMensaje(mensajeInicial);
        setState(prevState => ({ ...prevState, loading: true }));
        auth.login(usuario, contrasena)
            .then(authenticated => {
                setState(prevState => ({ ...prevState, loading: false, authenticated }));
                window.location.reload();
            })
            .catch(error => {
                setState(prevState => ({ ...prevState, loading: false, error }));
                setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            });
    }

    return (
        <div className="app flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card-group">
                            {mostrarLogin &&
                                <div className={classnames("card p-4 animated", { "fadeIn": mostrarLogin }, { 'fadeOut': !mostrarLogin })}>
                                    <div className="card-body">
                                        <h1 className="text-center">
                                            <img className="d-block w-50 mx-auto img-rounded" src={user} alt='' />
                                        </h1>
                                        <ValidationForm onSubmit={handleSubmitIniciarSesion} ref={formRef} immediate={true} setFocusOnError={true}>
                                            <InputGroup type={type.text} placeholder={PCHR_USUARIO} onChange={handleChangeUsuario} id="usuario"
                                                value={usuario} autoFocus={true} required className="form-control form-control-sm"
                                                errorMessage={{ required: MSJ_INGRESE_NOMBRE_USUARIO, pattern: '' }}>
                                                <UserIcon />
                                            </InputGroup>
                                            <InputGroup type={type.password} placeholder={PCHR_CONTRASENA} onChange={handleChangeContrasena} id="password"
                                                className="form-control form-control-sm" errorMessage={{ required: MSJ_INGRESE_CONTRASENA, pattern: '' }}
                                                value={contrasena} required>
                                                <UnlockAltIcon />
                                            </InputGroup>
                                            <div className="row mt-2">
                                                {mensaje.texto && <div className="col-12 text-left"><Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert></div>}
                                                <div className="col-12 text-center">
                                                    <ButtonAction type={type.submit} title={LABEL_INICIAR_SESION} className="btn btn-primary btn-sm px-4 text-center">
                                                        {LABEL_INICIAR_SESION} {state.loading && <LoadingIconChange tamanio="fa-xs" color="text-white" />}
                                                    </ButtonAction>
                                                </div>
                                            </div>
                                        </ValidationForm>
                                        <p className="card-text mt-2">
                                            Si no tienes un usuario puedes
                                            <button className="btn btn-link btn-sm p-0 ml-1" onClick={handleChangeMostrarSolicitarUser}>solicitar uno</button>.
                                        </p>
                                    </div>
                                </div>
                            }
                            {!mostrarLogin &&
                                <div className={classnames("card", { "fadeOut animated": mostrarLogin }, { "fadeIn animated": !mostrarLogin })}>
                                    <FormularioSolicitarUsuario handleClickAtras={handleChangeAtras} />
                                </div>
                            }
                            <CardInfoSession titulo={LABEL_SISTEMA_INFORMACION_GEOGRAFICA} empresa={LABEL_EPS_GRAU_SA} width="130px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormularioLogin;