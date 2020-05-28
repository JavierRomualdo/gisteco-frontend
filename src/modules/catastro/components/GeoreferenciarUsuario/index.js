import React, { useState, useRef } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import MarcadorOL from '../../../global/components/MarcadorOL';
import ButtonAction from '../../../global/components/ButtonAction';
import { type, LABEL_ACEPTAR, LABEL_CANCELAR } from '../../../global/values';
import InputText from '../../../global/components/InputText';
import {
    LABEL_SUMINISTRO, PCHR_INGRESE_SUMINISTRO, LABEL_GEOREFERENCIAR,
    MSJ_CONFIRMAR_MOVER_USUARIO,
    TITULO_GEOREFERENCIAR_USUARIO,
    TITULO_MOVER_USUARIO
} from './values';
import { MarkerAltIcon, LoadingIcon } from '../../../../lib/icons';
import LabelCoordenadas from './subcomponents/LabelCoordenas';
import { GEOREFERENCIAR_USUARIO, MOVER_USUARIO } from './mutations';
import marker from '../../../../assets/img/marker7.png';
import { mapStoreToProps } from '../../../../pages/Mapa/store/Store';
import Swal from 'sweetalert2';

const msgConfirmation = {
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: LABEL_ACEPTAR,
    cancelButtonText: LABEL_CANCELAR
};

const GeoreferenciarUsuario = ({ markerInitPos }) => {
    const [numInscripcion, setNumInscripcion] = useState("");
    const [loading, setLoading] = useState(false);
    const marcadorRef = useRef(null);

    const client = useApolloClient();

    function handleChangeSuministro(e) {
        setNumInscripcion(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        confirmarGeoreferenciar();
    }

    function georeferenciarUsuario() {
        setLoading(true);
        const coordenadas = marcadorRef.current.getCoordinate();
        client.mutate({
            mutation: GEOREFERENCIAR_USUARIO,
            variables: { numInscripcion: parseInt(numInscripcion), coordenadas }
        })
            .then(({ data }) => {
                const { mensaje, codigo_respuesta } = data.catastro.georeferenciarUsuario;
                if (codigo_respuesta === 0) confirmarMoverUsuario({ numInscripcion: parseInt(numInscripcion), coordenadas });
                else Swal.fire('¡Buen trabajo!', mensaje, 'success');
            })
            .catch(error => Swal.fire('Algo salió mal :(', error.message, 'error'))
            .finally(() => setLoading(false));
    }

    function confirmarGeoreferenciar() {

        Swal.fire({
            ...msgConfirmation,
            title: TITULO_GEOREFERENCIAR_USUARIO,
            text: `¿Deseas georeferenciar al usuario con suministro '${numInscripcion}' en esta ubicación?`
        })
            .then(result => {
                if (result.value) {
                    georeferenciarUsuario();
                }
            });
    }

    function confirmarMoverUsuario(props) {

        Swal.fire({
            ...msgConfirmation,
            title: TITULO_MOVER_USUARIO,
            text: MSJ_CONFIRMAR_MOVER_USUARIO
        })
            .then(result => {
                if (result.value) {
                    moverUsuario(props);
                }
            });
    }

    function moverUsuario(props) {
        const { numInscripcion, coordenadas } = props;
        client.mutate({
            mutation: MOVER_USUARIO,
            variables: { numInscripcion, coordenadas }
        })
            .then(() => Swal.fire('¡Buen trabajo!', 'El usuario ha sido movido', 'success'))
            .catch(error => Swal.fire('Algo salió mal :(', error.message, 'error'))
            .finally(() => setLoading(false));
    }

    return (
        <TabComponentContainer>
            <form onSubmit={handleSubmit}>
                <InputText value={numInscripcion} name="numInscripcion" etiqueta={LABEL_SUMINISTRO}
                    placeholder={PCHR_INGRESE_SUMINISTRO} onChangeInput={handleChangeSuministro}
                    autoFocus={true} maxLength={8} required />
                <MarcadorOL ref={marcadorRef} initPosition={markerInitPos} imgMarker={marker} render={coordinate =>
                    <LabelCoordenadas coordinate={coordinate} imgMarker={marker} />}>
                </MarcadorOL>
                <ButtonAction type={type.submit} title={LABEL_GEOREFERENCIAR} className={"btn btn-primary btn-sm mt-2"} disabled={loading}>
                    <MarkerAltIcon />
                    <span className="d-none d-md-inline"> {LABEL_GEOREFERENCIAR} </span>
                </ButtonAction>
                {loading && <div className="text-center"><LoadingIcon /></div>}
            </form>
        </TabComponentContainer>
    );
}

export default mapStoreToProps(GeoreferenciarUsuario, ({ map }) => {
    return {
        markerInitPos: map.getView().getCenter()
    }
});