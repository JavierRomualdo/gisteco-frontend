import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Select from '../../global/components/Select';
import SelectOption from '../../global/components/SelectOption';
import TextArea from '../../global/components/TextArea';
import InputText from '../../global/components/InputText';
import CalendarPrime from '../../global/components/CalendarPrime';
import TextInputGroup from '../../global/components/TextInputGroup';
import ButtonAction from '../../global/components/ButtonAction';
import InputMaskPrime from '../../global/components/InputMaskPrime';
import SpinnerPrime from '../../global/components/SpinnerPrime';
import { Spinner } from 'primereact/spinner';
import { CalculatorIcon, SaveIcon, LoadingIcon, EraserIcon } from '../../../lib/icons';
import { FECHA_ACTUAL, FECHA_INICIO, HORA_ACTUAL, fomatearFechaAString } from '../../../lib/moment';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../lib/alerts';
import { LABEL_GUARDAR, type, LABEL_LIMPIAR } from '../../global/values';
import {
    LABEL_TIPO_INCIDENCIA, LISTA_TIPO_INCIDENCIA, LABEL_DESCRIPCION, PCHR_DESCRIPCION, PCHR_REFERENCIA_UBICACION, LABEL_DIAMETRO,
    LABEL_REFERENCIA_UBICACION, LABEL_MATERIAL_TUBERIA, LISTA_MATERIAL_TUBERIA, LABEL_PRESION,
    LABEL_PERDIDA_M3, PCHR_PERDIDA_M3, TITULO_CALCULAR_PERDIDA, LABEL_FECHA_INICIO_FUGA, LABEL_FECHA_FUGA_CONTROLADA,
    LABEL_HORA_INICIO_FUGA, LABEL_HORA_FUGA_CONTROLADA, MSJ_INGRESE_DATOS_PA_CALCULO_PERDIDA
} from './values';
import FeatureSelector from '../../global/components/FeatureSelector';
import { CAPA_TUBERIAS } from '../../values';
import { withStore } from '../../../pages/Mapa/store/Store';
import { calcularPerdida, guardarFuga, checkFormIsFilled } from './util';
import Swal from 'sweetalert2';
import InputGidTuberia from './subcomponents/InputGidTuberia';

const estadoInicial = {
    idCorrTipoReclamoProblema: LISTA_TIPO_INCIDENCIA[0].id, descripcion: '', referenciaUbicacion: '',
    fechaInicioFuga: FECHA_INICIO, fechaSolucionFuga: FECHA_ACTUAL, horaInicio: fomatearFechaAString(HORA_ACTUAL, 'hh:mm a'),
    horaSolucion: fomatearFechaAString(HORA_ACTUAL, 'hh:mm a'), diametroTuberia: 0, materialTuberia: LISTA_MATERIAL_TUBERIA[0].id,
    presionEstimada: 0, problemasRelacionados: "", gidTuberiaAfectada: "", perdidaM3: ''
};

const confirmOptions = {
    title: '¿Está seguro?',
    text: "El registro no se podrá eliminar. Asegúrese que la información ingresada sea la correcta.",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Sí, proceder'
};

const SELECCION_TUBERIA_FUGA = 'SELECCIONAR_TUBERIA_FUGA';

const RegistrarFugaRedPrimariaSecundaria = ({ storeContext: { map } }) => {

    const [perdidaM3, setPerdidaM3] = useState("");
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(estadoInicial);

    const client = useApolloClient();

    function handleChangeInput(e) {
        const value = e.target.value, name = e.target.name;
        let nuevoDatosFormulario = { ...formData };
        switch (name) {
            case 'idCorrTipoReclamoProblema':
                nuevoDatosFormulario = { ...formData, [name]: parseInt(value) };
                break;
            case 'presionEstimada':
            case 'diametroTuberia':
                let diametro = 0;
                if (value !== "" && !isNaN(value)) diametro = parseFloat(value);
                nuevoDatosFormulario = { ...formData, [name]: diametro };
                break;
            default:
                nuevoDatosFormulario = { ...formData, [name]: e.target.value };
                break;
        }
        setFormData(nuevoDatosFormulario);
    }

    function handleClickButtonCalcularPerdidaFuga(e) {
        e.preventDefault();
        const { presionEstimada, fechaInicioFuga, fechaSolucionFuga, diametroTuberia } = formData;
        if (presionEstimada && fechaInicioFuga && fechaSolucionFuga && diametroTuberia) {
            setMensaje(mensajeInicial);
            setLoading(true);
            calcularPerdida(client, formData)
                .then(volumenPerdido => {
                    setPerdidaM3(volumenPerdido);
                }).catch(error => setMensaje({ texto: `Error: ${error.message}`, tipo: TIPO_ALERTA.ERROR }))
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setMensaje({ texto: MSJ_INGRESE_DATOS_PA_CALCULO_PERDIDA, tipo: TIPO_ALERTA.ADVERTENCIA });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        try {
            checkFormIsFilled(formData);
            setMensaje({ texto: '', tipo: '' });
            Swal.fire(confirmOptions)
                .then(result => {
                    if (result.value) {
                        registrarFuga();
                    }
                })
        } catch (error) {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ADVERTENCIA });
        }
    }

    function registrarFuga() {

        setMensaje(mensajeInicial);
        setLoading(true);
        guardarFuga(client, formData)
            .then(registrado => {
                if (registrado) {
                    Swal.fire('¡Buen trabajo!', '¡La fuga ha sido registrada!', 'success');
                    limpiarFormulario();
                }
            })
            .catch(error => Swal.fire('¡Error!', error.message, 'error'))
            .finally(() => {
                setLoading(false);
            });
    }

    function handleResetForm(e) {
        limpiarFormulario();
    }

    function limpiarFormulario() {
        setFormData(estadoInicial);
        setPerdidaM3('');
        setMensaje('');
        map.seleccion.getSource().clear();
    }

    const { idCorrTipoReclamoProblema, descripcion, referenciaUbicacion, fechaInicioFuga, fechaSolucionFuga, horaInicio, horaSolucion,
        diametroTuberia, materialTuberia, presionEstimada } = formData;
    return (
        <div className="p-3 mb-5">
            <form onSubmit={handleSubmit}>
                <FeatureSelector
                    tarea={SELECCION_TUBERIA_FUGA}
                    onFeatureSelected={(ft, finish) => {
                        setFormData(prevData => ({ ...prevData, gidTuberiaAfectada: ft.get('gid') }))
                        finish();
                    }}
                    layerFilter={(ly) => {
                        if (ly === map.getCapaById(CAPA_TUBERIAS)) return true;
                        return false;
                    }}
                >
                    {(start, finish, { onProgress }) => {
                        return (
                            <div className="form-group">
                                <label>GID Tubería afectada</label>
                                <InputGidTuberia
                                    value={formData.gidTuberiaAfectada}
                                    selection={onProgress}
                                    onClick={() => {
                                        if (onProgress) finish();
                                        else start();
                                    }}
                                />
                            </div>
                        );
                    }}
                </FeatureSelector>
                <SelectOption value={idCorrTipoReclamoProblema} name='idCorrTipoReclamoProblema' etiqueta={LABEL_TIPO_INCIDENCIA} lista={LISTA_TIPO_INCIDENCIA}
                    onChangeSelect={handleChangeInput} autoFocus={true} />
                <TextArea rows={3} value={descripcion} name="descripcion" etiqueta={LABEL_DESCRIPCION} placeholder={PCHR_DESCRIPCION} onChangeInput={handleChangeInput} />
                <InputText value={referenciaUbicacion} name="referenciaUbicacion" etiqueta={LABEL_REFERENCIA_UBICACION} placeholder={PCHR_REFERENCIA_UBICACION}
                    onChangeInput={handleChangeInput} />
                <div className="p-grid p-fluid row mb-3">
                    <CalendarPrime value={fechaInicioFuga} name="fechaInicioFuga" etiqueta={LABEL_FECHA_INICIO_FUGA} onChangeCalendar={handleChangeInput}
                        showIcon={true} maxDate={new Date()} dateFormat="dd/mm/yy" inputClassName="form-control-sm" required />
                    <InputMaskPrime mask="99:99 am" value={horaInicio} placeholder="01:20 PM" slotChar="hh:mm am" onChange={handleChangeInput}
                        etiqueta={LABEL_HORA_INICIO_FUGA} className="form-control form-control-sm" name="horaInicio" required />
                </div>
                <div className="p-grid p-fluid row mb-3">
                    <CalendarPrime value={fechaSolucionFuga} name="fechaSolucionFuga" etiqueta={LABEL_FECHA_FUGA_CONTROLADA} onChangeCalendar={handleChangeInput}
                        showIcon={true} maxDate={new Date()} dateFormat="dd/mm/yy" inputClassName="form-control-sm" required />
                    <InputMaskPrime mask="99:99 am" value={horaSolucion} placeholder="01:20 PM" slotChar="hh:mm am" onChange={handleChangeInput}
                        etiqueta={LABEL_HORA_FUGA_CONTROLADA} className="form-control form-control-sm" name="horaSolucion" required />
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-6'>
                        <label className='font-weight-bold'>{LABEL_DIAMETRO}</label>
                        <Spinner className='d-block' inputClassName='form-control form-control-sm' value={diametroTuberia} name="diametroTuberia" min={0} onChange={handleChangeInput} />
                    </div>
                    <div className='col-sm-6'>
                        <label className='font-weight-bold'>{LABEL_MATERIAL_TUBERIA}</label>
                        <Select className='form-control form-control-sm' required={true} value={materialTuberia} name='materialTuberia' lista={LISTA_MATERIAL_TUBERIA} onChange={handleChangeInput} />
                    </div>
                </div>
                <SpinnerPrime className='d-block' inputClassName='form-control form-control-sm' value={presionEstimada} name="presionEstimada" min={0} step={0.01} etiqueta={LABEL_PRESION} onSpinnerChange={handleChangeInput} />
                <TextInputGroup value={perdidaM3} name="perdidaM3" etiqueta={LABEL_PERDIDA_M3} placeholder={PCHR_PERDIDA_M3} title={TITULO_CALCULAR_PERDIDA}
                    disabled onClick={handleClickButtonCalcularPerdidaFuga}>
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
}

export default withStore(RegistrarFugaRedPrimariaSecundaria);