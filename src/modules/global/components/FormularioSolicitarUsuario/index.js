import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import './estilos.css';
import { ValidationForm } from "react-bootstrap4-form-validation";
import validator from 'validator';
import messages from '../../../../lib/messages/messages';
import { REGISTRAR_USUARIO_SOLICITUD } from './mutations';
import InputGroup from '../InputGroup';
import ButtonAction from '../ButtonAction';
import SelectOptionGroup from '../SelectOptionGroup';
import { type, TAG_DNI, NUMBER_REGEXP, LABEL_REGRESAR, LABEL_CORREO_ELECTRONICO, MSJ_INGRESE_CORREO_ELECTRONICO, LABEL_ENVIAR } from '../../values';
import { LABEL_NOMBRE_COMPLETO, MSJ_INGRESE_NOMBRE_COMPLETO, LABEL_CARGO, MSJ_INGRESE_CARGO,
    LABEL_DEPENDENCIA, MSJ_INGRESE_DEPENDENCIA, PCHR_EJM_COMERCIAL, LABEL_ZONAL,
    MSJ_INGRESE_ZONAL, LISTA_ZONAL, LABEL_ENVIAR_SOLICITUD, LABEL_SOLICITAR_USUARIO, MSJ_REGISTRO_EXITO_SOLICITUD_USUARIO } from './values';
import { IdCardIcon, EnvelopeIcon, AddressIcon, MailIcon, Briefcase, LaptopIcon, CaretLetIcon, LoadingIconChange } from '../../../../lib/icons';
import { MSJ_INGRESE_NUMERO_DOCUMENTO } from '../../../herramientasSesion/components/CambiarContrasena/values';


const FormularioSolicitarUsuario = ({handleClickAtras}) => {
    const [dni,setDni] = useState("");
    const [nombreCompleto,setNombreCompleto] = useState('');
    const [correo,setCorreo] = useState('');
    const [cargo,setCargo] = useState('');
    const [dependencia,setDependencia] = useState('');
    const [zonal,setZonal] = useState('');
    const [loading, setLoading] = useState(false);
    const formRef = React.createRef();
    const client = useApolloClient();

    function handleInputChangeDni(e) {
        const value = e.target.value;
        if (!NUMBER_REGEXP.test(value)) return;
        setDni(value);
    }

    function handleInputChangeNombreCompleto(e) {
        setNombreCompleto(e.target.value);
    }

    function handleInputChangeCorreoElectronico(e) {
        setCorreo(e.target.value);
    }

    function handleInputChangeCargo(e) {
        setCargo(e.target.value);
    }

    function handleInputChangeDependencia(e) {
        setDependencia(e.target.value);
    }

    function handleInputChangeZonal(e) {
        setZonal(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        client.mutate({
            mutation: REGISTRAR_USUARIO_SOLICITUD,
            variables: { dni, nombreCompleto, correo, cargo, dependencia, zonal: parseInt(zonal) }
        }).then((data) => {
            if (data.data.sistema.registrarUsuarioSolicitud) {
                messages.growl.show({ severity: 'success', detail: `${MSJ_REGISTRO_EXITO_SOLICITUD_USUARIO}` });
                handleClickAtras(e);
            }
        }).catch((error) => {
            messages.growl.show({ severity: 'error', detail: `${error.message}` });
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <ValidationForm onSubmit={handleSubmit} ref={formRef} immediate={true}>
            <div className="card-header p-1">
                <button className="btn btn-primary btn-sm mr-1" type={type.button} onClick={handleClickAtras} title={LABEL_REGRESAR}>
                    <CaretLetIcon/>
                </button>
                <strong>{LABEL_SOLICITAR_USUARIO}</strong>
                <div className="card-header-actions">
                    <ButtonAction type={type.submit} title={LABEL_ENVIAR} className="btn btn-primary btn-sm mr-1">
                        <EnvelopeIcon/>
                        <span className="d-none d-md-inline"> {LABEL_ENVIAR_SOLICITUD} </span>
                        {loading && <LoadingIconChange tamanio="fa-xs" color="text-white"/>}
                    </ButtonAction>
                </div>
            </div>
            <div className="card-body px-4 py-2">
                <InputGroup type={type.text} placeholder={TAG_DNI} onChange={handleInputChangeDni} id="dni"
                    value={dni} autoFocus={true} className="form-control form-control-sm" label={TAG_DNI} maxLength="8"
                    required pattern="\d{8}" errorMessage={{required: MSJ_INGRESE_NUMERO_DOCUMENTO, pattern:''}}>
                    <IdCardIcon/>
                </InputGroup>
                <InputGroup type={type.text} placeholder={LABEL_NOMBRE_COMPLETO} onChange={handleInputChangeNombreCompleto} id="nombrecompleto"
                    value={nombreCompleto} label={LABEL_NOMBRE_COMPLETO} required className="form-control form-control-sm"
                    errorMessage={{required: MSJ_INGRESE_NOMBRE_COMPLETO, pattern:''}}>
                    <AddressIcon/>
                </InputGroup>
                <InputGroup type={type.text} placeholder={LABEL_CORREO_ELECTRONICO} onChange={handleInputChangeCorreoElectronico} id="correo"
                    value={correo} label={LABEL_CORREO_ELECTRONICO} required className="form-control form-control-sm" validator={validator.isEmail}
                    errorMessage={{required: MSJ_INGRESE_CORREO_ELECTRONICO, pattern:'', validator: "Ingrese un correo válido"}}>
                    <MailIcon/>
                </InputGroup>
                <InputGroup type={type.text} placeholder={LABEL_CARGO} onChange={handleInputChangeCargo} id="cargo"
                    value={cargo} label={LABEL_CARGO} required className="form-control form-control-sm"
                    errorMessage={{required: MSJ_INGRESE_CARGO, pattern:''}}>
                    <Briefcase/>
                </InputGroup>
                <InputGroup type={type.text} placeholder={PCHR_EJM_COMERCIAL} onChange={handleInputChangeDependencia} id="dependencia"
                    value={dependencia} label={LABEL_DEPENDENCIA} required className="form-control form-control-sm"
                    errorMessage={{required: MSJ_INGRESE_DEPENDENCIA, pattern:''}}>
                    <LaptopIcon/>
                </InputGroup>
                <SelectOptionGroup value={zonal} id="zonal" lista={LISTA_ZONAL} label={LABEL_ZONAL} onChange={handleInputChangeZonal} required
                    errorMessage={{required: MSJ_INGRESE_ZONAL, pattern:''}} >
                </SelectOptionGroup>
            </div>
        </ValidationForm>
    );
}

export default FormularioSolicitarUsuario;