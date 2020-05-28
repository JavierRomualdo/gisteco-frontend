import React, { useState, useRef } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import {
    LABEL_TEXTO, PCHR_INGRESE_TEXTO, LABEL_VISIBILIDAD,
    MSJ_MARCADOR_NO_AGREGADO, LABEL_PUBLICO, LABEL_PRIVADO
} from './values';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import InputText from '../../../global/components/InputText';
import MarcadorOL from '../../../global/components/MarcadorOL';
import { MarkerAltIcon, LoadingIcon } from '../../../../lib/icons';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import marker from '../../../../assets/img/marker5.png';
import LabelCoordenadas from '../GeoreferenciarUsuario/subcomponents/LabelCoordenas';
import { type, LABEL_GUARDAR } from '../../../global/values';
import ButtonAction from '../../../global/components/ButtonAction';
import { InputSwitch } from 'primereact/inputswitch';
import { CREAR_MARCADOR } from './mutations';
import { mapStoreToProps } from '../../../../pages/Mapa/store/Store';
import Swal from 'sweetalert2';

const AgregarMarcador = ({ markerInitPos }) => {
    const [texto, setTexto] = useState("");
    const [visibilidad, setVisibilidad] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const marcadorRef = useRef(null);

    const client = useApolloClient();

    function handleChangeTexto(e) {
        setTexto(e.target.value);
    }

    function handleChangeVisilidad(e) {
        setVisibilidad(!visibilidad);
    }

    function handleSubmit(e) {
        e.preventDefault();
        crearMarcador();
    }

    function crearMarcador() {
        setLoading(true);
        setMensaje(mensajeInicial);
        const coordenadas = marcadorRef.current.getCoordinate();
        client.mutate({
            mutation: CREAR_MARCADOR,
            variables: { coordenadas, texto, publico: visibilidad }
        }).then(({ data }) => {
            const rpta = data.catastro.crearMarcador;
            if (rpta) {
                Swal.fire('¡Buen trabajo!', 'El punto de referencia ha sido agregado', 'success');
            } else setMensaje({ texto: MSJ_MARCADOR_NO_AGREGADO, tipo: TIPO_ALERTA.ERROR });
        }).catch(error => Swal.fire('¡Algo salió mal! :(', error.message, 'error'))
            .finally(() => setLoading(false));
    }

    return (
        <TabComponentContainer>
            <form onSubmit={handleSubmit}>
                <InputText value={texto} name="texto" etiqueta={LABEL_TEXTO}
                    placeholder={PCHR_INGRESE_TEXTO} onChangeInput={handleChangeTexto}
                    autoFocus={true} maxLength={50} required />
                <MarcadorOL ref={marcadorRef} initPosition={markerInitPos} imgMarker={marker} render={coordinate =>
                    <LabelCoordenadas coordinate={coordinate} imgMarker={marker} />}></MarcadorOL>
                <label className="mt-2 mb-3"><strong>{LABEL_VISIBILIDAD}</strong> ({visibilidad ? LABEL_PUBLICO : LABEL_PRIVADO})</label>
                <InputSwitch checked={visibilidad} onChange={handleChangeVisilidad} className="card-header-actions" /><br />
                <ButtonAction type={type.submit} title={LABEL_GUARDAR} className={"btn btn-primary btn-sm mb-2"} disabled={loading}>
                    <MarkerAltIcon />
                    <span className="d-none d-md-inline"> {LABEL_GUARDAR} </span>
                </ButtonAction>
                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
                {loading && <div className="text-center"><LoadingIcon /></div>}
            </form>
        </TabComponentContainer>
    );
}
export default mapStoreToProps(AgregarMarcador, ({ map }) => {
    return {
        markerInitPos: map.getView().getCenter()
    }
});