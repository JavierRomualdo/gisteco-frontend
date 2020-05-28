import React, { useState } from 'react';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import SelectOption from '../../../global/components/SelectOption';
import {
    LISTA_PROYECCIONES, LABEL_COORDENADAS, MSJ_COORDENADAS, LABEL_CONVERTIR,
    MSJ_COORDENADAS_IGUALES
} from './values';
import InputText from '../../../global/components/InputText';
import { type } from '../../../global/values';
import { ExChangeAltIcon } from '../../../../lib/icons';
import ButtonAction from '../../../global/components/ButtonAction';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import { transform } from 'ol/proj';
import { MSJ_INGRESE_LAS_DOS_COORDENADAS } from '../LocalizarCoordenadas/values';

const ConvertirCoordenadas = () => {
    const [proyecionDesde, setProyeccionDesde] = useState(LISTA_PROYECCIONES[1].id);
    const [proyecionHasta, setProyeccionHasta] = useState(LISTA_PROYECCIONES[2].id);
    const [coordenadas, setCoordenadas] = useState("");
    const [mensaje, setMensaje] = useState(mensajeInicial);

    function handleChangeProyeccionDesde(e) {
        setProyeccionDesde(e.target.value);
    }

    function handleChangeProyeccionHasta(e) {
        setProyeccionHasta(e.target.value);
    }

    function handleChangeInputCoordenadas(e) {
        setCoordenadas(e.target.value.toUpperCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (proyecionDesde !== proyecionHasta) {
            // aca convertimos
            const coords = coordenadas.split(',').map(c => parseFloat(c.trim()));
            const [x, y] = transform(coords, proyecionDesde, proyecionHasta).map(c => c.toFixed(6));
            if (isNaN(coords[0]) || isNaN(coords[1])) {
                setMensaje({ texto: MSJ_INGRESE_LAS_DOS_COORDENADAS, tipo: TIPO_ALERTA.ADVERTENCIA });
            } else setMensaje({ texto: 'Coordenadas: ' + x + ', ' + y, tipo: TIPO_ALERTA.EXITO });
        } else setMensaje({ texto: MSJ_COORDENADAS_IGUALES, tipo: TIPO_ALERTA.ADVERTENCIA });
    }
    return (
        <TabComponentContainer>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <SelectOption value={proyecionDesde} etiqueta={"De"} lista={LISTA_PROYECCIONES} onChangeSelect={handleChangeProyeccionDesde}
                            required autoFocus={true} />
                    </div>
                    <div className="col-md-6">
                        <SelectOption value={proyecionHasta} etiqueta={"A"} lista={LISTA_PROYECCIONES} onChangeSelect={handleChangeProyeccionHasta}
                            required />
                    </div>
                </div>
                <InputText value={coordenadas} etiqueta={LABEL_COORDENADAS} placeholder={MSJ_COORDENADAS} onChangeInput={handleChangeInputCoordenadas} required />
                <ButtonAction type={type.submit} title={LABEL_CONVERTIR} className={"btn btn-primary btn-sm mb-2"}>
                    <ExChangeAltIcon />
                    <span className="d-none d-md-inline"> {LABEL_CONVERTIR} </span>
                </ButtonAction>
                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            </form>
        </TabComponentContainer>
    );
}

export default ConvertirCoordenadas;