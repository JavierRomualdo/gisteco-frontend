import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import TextArea from '../../global/components/TextArea';
import InputText from '../../global/components/InputText';
import InputMaskPrime from '../../global/components/InputMaskPrime';
import CalendarPrime from '../../global/components/CalendarPrime';
import TextInputGroup from '../../global/components/TextInputGroup';
import ButtonAction from '../../global/components/ButtonAction';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../lib/alerts';
import { LABEL_SUMINISTRO, PCHR_INGRESE_SUMINISTRO } from '../../catastro/components/GeoreferenciarUsuario/values';
import { BUSCAR_SUMINISTRO_CODIGO_SUMINISTRO } from '../../catastro/components/BuscarUsuarioSuministro/queries';
import { FECHA_INICIO, FECHA_ACTUAL, HORA_ACTUAL, fomatearFechaAString } from '../../../lib/moment';
import { CalculatorIcon, SaveIcon, LoadingIcon, EraserIcon } from '../../../lib/icons';
import {
    LISTA_CAUSA, LABEL_CAUSA, LISTA_DIAMETRO, LABEL_DIAMETRO_PLG,
    MSJ_INGRESE_DATOS_PA_CALCULO_PERDIDA_FUGA_DOMICIALIARIA, MSJ_ALERTA_SUMINISTRO_INGRESE
} from './values';
import {
    LABEL_DESCRIPCION, PCHR_DESCRIPCION, PCHR_REFERENCIA_UBICACION, LABEL_REFERENCIA_UBICACION, LABEL_FECHA_INICIO_FUGA,
    LABEL_FECHA_FUGA_CONTROLADA, LABEL_HORA_INICIO_FUGA, LABEL_HORA_FUGA_CONTROLADA, LABEL_MATERIAL_TUBERIA,
    LISTA_MATERIAL_TUBERIA, LABEL_PERDIDA_M3, PCHR_PERDIDA_M3, TITULO_CALCULAR_PERDIDA,
    LABEL_ESPECIFIQUE_CAUSA, PCHR_INGRESE_CAUSA
} from '../RegistrarFugaRedPrimariaSecundaria/values';
import {
    LABEL_GUARDAR, type, LABEL_LIMPIAR, NUMBER_REGEXP,
    MSJ_NO_HAY_USUARIOS
} from '../../global/values';
import { calcularPerdida, guardarFuga } from './util';
import Select from '../../global/components/Select';
import Swal from 'sweetalert2';

const estadoInicial = {
    descripcion: '', referenciaUbicacion: '', fechaInicio: FECHA_INICIO, horaInicio: fomatearFechaAString(HORA_ACTUAL, 'hh:mm a'),
    fechaSolucion: FECHA_ACTUAL, horaSolucion: fomatearFechaAString(HORA_ACTUAL, 'hh:mm a'), suministro: '', materialTuberia: LISTA_MATERIAL_TUBERIA[0].id,
    diametroTuberia: LISTA_DIAMETRO[0].id, id_causa: LISTA_CAUSA[0].id, otra_causa: '', problemasRelacionados: null
}

const estadoInicialSuminstro = { mensaje: MSJ_ALERTA_SUMINISTRO_INGRESE, claseText: 'text-danger font-weight-bold', correcto: false };

const confirmOptions = {
    title: '¿Está seguro?',
    text: "El registro no se podrá eliminar. Asegúrese que la información ingresada sea la correcta.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, proceder'
};

const RegistrarFugaConexionDomicialiaria = () => {
    const [perdidaM3, setPerdidaM3] = useState("");
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [mensajeAlertaSuministro, setMensajeAlertaSuministro] = useState(estadoInicialSuminstro);
    const [loading, setLoading] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState(estadoInicial);
    const client = useApolloClient();

    function handleChangeInput(e) {
        const value = e.target.value, name = e.target.name;
        let nuevoDatosFormulario = { ...datosFormulario };
        switch (name) {
            case 'id_causa':
                nuevoDatosFormulario = { ...datosFormulario, [name]: parseInt(value) };
                break;
            case 'suministro':
                let nuevoMensajeSuministro = {
                    ...mensajeAlertaSuministro, mensaje: MSJ_ALERTA_SUMINISTRO_INGRESE,
                    claseText: 'text-danger font-weight-bold', correcto: false
                };
                nuevoDatosFormulario = { ...datosFormulario, [name]: '' };
                if (NUMBER_REGEXP.test(value) && value) {
                    nuevoMensajeSuministro = {
                        ...mensajeAlertaSuministro, mensaje: "",
                        claseText: 'text-success font-weight-bold', correcto: true
                    };
                    nuevoDatosFormulario = { ...datosFormulario, [name]: parseInt(value) };
                }
                setMensajeAlertaSuministro(nuevoMensajeSuministro);
                break;
            default:
                nuevoDatosFormulario = { ...datosFormulario, [name]: value };
                break;
        }
        setDatosFormulario(nuevoDatosFormulario);
    }

    function handleClickButtonCalcularPerdidaFuga(e) {
        e.preventDefault();
        const { fechaInicio, fechaSolucion, diametroTuberia } = datosFormulario;
        if (fechaInicio && fechaSolucion && diametroTuberia) {
            setMensaje(mensajeInicial);
            setLoading(true);
            calcularPerdida(client, datosFormulario)
                .then(volumenPerdido => {
                    setPerdidaM3(volumenPerdido);
                }).catch(error => setMensaje({ texto: "Error: " + error.message, tipo: TIPO_ALERTA.ERROR }))
                .finally(() => setLoading(false));
        } else setMensaje({ texto: MSJ_INGRESE_DATOS_PA_CALCULO_PERDIDA_FUGA_DOMICIALIARIA, tipo: TIPO_ALERTA.ADVERTENCIA });
    }

    function handleSubmit(e) {
        e.preventDefault();
        Swal.fire(confirmOptions)
            .then(result => {
                if (result.value) {
                    registrarFuga();
                }
            })
    }

    function registrarFuga() {
        setMensaje(mensajeInicial);
        setLoading(true);
        guardarFuga(client, datosFormulario)
            .then(registrado => {
                if (registrado) {
                    Swal.fire('¡Buen trabajo!', '¡La fuga ha sido registrada!', 'success');
                    limpiarFormulario();
                }
            })
            .catch(error => Swal.fire('¡Error!', error.message, 'error'))
            .finally(() => setLoading(false));
    }

    function handleResetForm(e) {
        limpiarFormulario();
    }

    function limpiarFormulario() {
        setDatosFormulario(estadoInicial);
        setMensajeAlertaSuministro(estadoInicialSuminstro);
        setPerdidaM3('');
        setMensaje('');
    }

    function handleVerficarSuministro(e) {
        if (mensajeAlertaSuministro.correcto) {
            setLoading(true);
            setMensaje(mensajeInicial);
            client.query({
                query: BUSCAR_SUMINISTRO_CODIGO_SUMINISTRO,
                variables: { numInscripcion: String(suministro) },
                fetchPolicy: "network-only"
            }).then(({ data }) => {
                const { buscarSuministroPorNumInscription } = data.catastro;
                if (buscarSuministroPorNumInscription.length === 0) {
                    setMensajeAlertaSuministro({ mensaje: MSJ_NO_HAY_USUARIOS, claseText: 'text-danger font-weight-bold' });
                } else {
                    setMensajeAlertaSuministro({
                        mensaje: `Titular: ${buscarSuministroPorNumInscription[0].nombre_titular}`,
                        claseText: 'text-success font-weight-bold'
                    });
                }
            }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }))
                .finally(() => setLoading(false));
        }
    }

    const { suministro, id_causa, otra_causa, descripcion, referenciaUbicacion, fechaInicio, fechaSolucion, horaInicio, horaSolucion, diametroTuberia, materialTuberia } = datosFormulario;
    return (
        <div className="p-3 mb-5">
            <form onSubmit={handleSubmit}>
                <InputText value={suministro} name="suministro" etiqueta={LABEL_SUMINISTRO} placeholder={PCHR_INGRESE_SUMINISTRO}
                    onChangeInput={handleChangeInput} maxLength={8} autoFocus={true} onBlur={handleVerficarSuministro}
                    textHelp={mensajeAlertaSuministro.mensaje} classHelp={mensajeAlertaSuministro.claseText} required />
                <div className="form-group">
                    <label className='font-weight-bold'>{LABEL_CAUSA}</label>
                    <Select className='form-control form-control-sm' value={id_causa} name="id_causa" lista={LISTA_CAUSA} onChange={handleChangeInput} />
                </div>
                {id_causa === 99 &&
                    <InputText value={otra_causa} name="otra_causa" etiqueta={LABEL_ESPECIFIQUE_CAUSA} placeholder={PCHR_INGRESE_CAUSA}
                        onChangeInput={handleChangeInput} required autoFocus />}
                <TextArea rows={3} value={descripcion} name="descripcion" etiqueta={LABEL_DESCRIPCION} placeholder={PCHR_DESCRIPCION} onChangeInput={handleChangeInput} />
                <InputText value={referenciaUbicacion} name="referenciaUbicacion" etiqueta={LABEL_REFERENCIA_UBICACION} placeholder={PCHR_REFERENCIA_UBICACION}
                    onChangeInput={handleChangeInput} />
                <div className="p-grid p-fluid row mb-3">
                    <CalendarPrime value={fechaInicio} name="fechaInicio" etiqueta={LABEL_FECHA_INICIO_FUGA} onChangeCalendar={handleChangeInput} showIcon={true}
                        maxDate={new Date()} dateFormat="dd/mm/yy" inputClassName="form-control-sm" required />
                    <InputMaskPrime mask="99:99 am" value={horaInicio} placeholder="01:20 PM" slotChar="hh:mm am" onChange={handleChangeInput}
                        etiqueta={LABEL_HORA_INICIO_FUGA} className="form-control form-control-sm" name="horaInicio" required />
                </div>
                <div className="p-grid p-fluid row mb-3">
                    <CalendarPrime value={fechaSolucion} name="fechaSolucion" etiqueta={LABEL_FECHA_FUGA_CONTROLADA} onChangeCalendar={handleChangeInput} showIcon={true}
                        maxDate={new Date()} dateFormat="dd/mm/yy" inputClassName="form-control-sm" required />
                    <InputMaskPrime mask="99:99 am" value={horaSolucion} placeholder="01:20 PM" slotChar="hh:mm am" onChange={handleChangeInput}
                        etiqueta={LABEL_HORA_FUGA_CONTROLADA} className="form-control form-control-sm" name="horaSolucion" required />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className='font-weight-bold'>{LABEL_DIAMETRO_PLG}</label>
                        <Select className='form-control form-control-sm' value={diametroTuberia} name="diametroTuberia" lista={LISTA_DIAMETRO} onChange={handleChangeInput} />
                    </div>
                    <div className="col-md-6">
                        <label className='font-weight-bold'>{LABEL_MATERIAL_TUBERIA}</label>
                        <Select className='form-control form-control-sm' value={materialTuberia} name="materialTuberia" lista={LISTA_MATERIAL_TUBERIA} onChange={handleChangeInput} />
                    </div>
                </div>
                <TextInputGroup value={perdidaM3} etiqueta={LABEL_PERDIDA_M3} placeholder={PCHR_PERDIDA_M3} title={TITULO_CALCULAR_PERDIDA} disabled onClick={handleClickButtonCalcularPerdidaFuga}>
                    <CalculatorIcon />
                </TextInputGroup>
                <ButtonAction type={type.submit} title={LABEL_GUARDAR} className="btn btn-sm btn-primary mb-2">
                    <SaveIcon />
                    <span className="d-none d-md-inline"> {LABEL_GUARDAR} </span>
                </ButtonAction>
                <ButtonAction type={type.button} title={LABEL_LIMPIAR} className="btn btn-sm btn-light ml-1 mb-2" onClickButton={handleResetForm}>
                    <EraserIcon />
                    <span className="d-none d-md-inline"> {LABEL_LIMPIAR} </span>
                </ButtonAction>
            </form>
            {loading && <div className="text-center"><LoadingIcon /></div>}
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
        </div>
    );
};

export default RegistrarFugaConexionDomicialiaria;