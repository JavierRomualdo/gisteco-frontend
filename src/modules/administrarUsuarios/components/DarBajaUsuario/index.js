import React, { useState, useRef } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Alert, { mensajeInicial } from '../../../../lib/alerts';
import ButtonAction from '../../../global/components/ButtonAction';
import TextArea from '../../../global/components/TextArea';
import { ThumbsDown, EraserIcon } from '../../../../lib/icons';
import { SUSPENDER_USUARIO_SISTEMA } from './mutations';
import {
    PCHR_INGRESAR_MOTIVO,
    LABEL_DAR_BAJA
} from './values';
import { TAG_MOTIVO, LABEL_LIMPIAR, type } from '../../../global/values';
import AutoCompleteUsuarios from '../../../global/components/AutoCompleteUsuarios';
import Swal from 'sweetalert2';

const DarBajaUsuario = () => {
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Object
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [motivoBaja, setMotivoBaja] = useState('');
    const client = useApolloClient();
    const inputRef = useRef();

    function handleChangeTextAreaObservacion(e) {
        setMotivoBaja(e.target.value.toUpperCase());
    }

    function handleSubmitDarBajaUsuario(e) {
        e.preventDefault();

        if (!usuarioSeleccionado) return setMensaje({ texto: 'Seleccione un usuario', tipo: 'warning' });
        if (!motivoBaja) return setMensaje({ texto: 'Indique el motivo de la acción', tipo: 'warning' });

        Swal.fire({
            title: '¿Está seguro?',
            text: `¿Deseas dar de baja al suario: '${usuarioSeleccionado.nombre_completo}'?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, proceder'
        }).then(result => {
            if (result.value) {
                darBajaAlUsuario();
            }
        })
    }

    function darBajaAlUsuario() {
        setMensaje(mensajeInicial);
        client.mutate({
            mutation: SUSPENDER_USUARIO_SISTEMA,
            variables: { idUsuario: parseInt(usuarioSeleccionado.id), motivo: motivoBaja },
        }).then(({ data }) => {
            const { suspenderUsuarioSistema } = data.sistema;
            if (suspenderUsuarioSistema) {
                Swal.fire('¡Buen trabajo!', 'El usuario ha sido dado de baja', 'success')
                limpiarFormulario();
            }
        }).catch(error => Swal.fire('!Algo salió mal! :(', error.message, 'error'));
    }

    function limpiarFormulario(e) {
        inputRef.current.clearInput();
        setUsuarioSeleccionado(null);
        setMotivoBaja("");
        setMensaje(mensajeInicial);
    }

    const userInputText = usuarioSeleccionado ? usuarioSeleccionado.nombre_completo : '';

    return (
        <div className="p-2">
            <form onSubmit={handleSubmitDarBajaUsuario} className='form'>
                <div className="form-group">
                    <label className='font-weight-bold'>Usuario</label>
                    <AutoCompleteUsuarios
                        ref={inputRef}
                        autoFocus={true}
                        inputId="inputUsuariosParaBaja"
                        value={userInputText}
                        onChange={() => {
                            setUsuarioSeleccionado(null);
                        }}
                        onSelect={e => {
                            setUsuarioSeleccionado(e.value)
                        }}
                    />
                </div>
                <TextArea value={motivoBaja} rows={3} etiqueta={TAG_MOTIVO} placeholder={PCHR_INGRESAR_MOTIVO} onChangeInput={handleChangeTextAreaObservacion} required />
                <div className="mb-2">
                    <ButtonAction type={type.submit} title={LABEL_DAR_BAJA} className="btn btn-sm btn-primary mr-2">
                        <ThumbsDown />
                        <span className="d-none d-md-inline"> {LABEL_DAR_BAJA} </span>
                    </ButtonAction>
                    <ButtonAction type={type.button} title={LABEL_LIMPIAR} className="btn btn-sm btn-light" onClickButton={limpiarFormulario}>
                        <EraserIcon />
                        <span className="d-none d-md-inline"> {LABEL_LIMPIAR} </span>
                    </ButtonAction>
                </div>
                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            </form>
        </div>
    );
}

export default DarBajaUsuario;