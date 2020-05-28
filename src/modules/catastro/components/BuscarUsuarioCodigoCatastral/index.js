import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import { LABEL_INGRESE_CODIGO_CATASTRAL, estadoInicial } from './values';
import { NUMBER_REGEXP, MSJ_NO_HAY_USUARIOS, type, LABEL_BUSCAR } from '../../../global/values';
import { BUSCAR_SUMINISTRO_CODIGO_CATASTRAL } from './queries';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import InlineInputText from '../../../global/components/InlineInputText';
import ButtonSearch from '../../../global/components/ButtonSearch';
import { CAPA_USUARIOS, LABEL_LOCALIZAR } from '../../../values';
import { LoadingIcon, PlaneIcon } from '../../../../lib/icons';
import ButtonAction from '../../../global/components/ButtonAction';
import { withStore } from '../../../../pages/Mapa/store/Store';

const BuscarUsuarioCodigoCatastral = ({ storeContext: { map } }) => {
    const [codigoCatastral, setCodigoCatastral] = useState(estadoInicial);
    const [numInscripcion, setNumeroSuministro] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [mensajeNoReferenciar, setMensajeNoReferenciar] = useState(null);

    const client = useApolloClient();

    function handleInputChange(e) {
        const value = e.target.value,
            name = e.target.name;
        if (value !== "") {
            if (!NUMBER_REGEXP.test(value)) return;
            setCodigoCatastral({ ...codigoCatastral, [name]: parseInt(value) });
        } else {
            setCodigoCatastral({ ...codigoCatastral, [name]: value });
        }
    }

    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_SUMINISTRO_CODIGO_CATASTRAL,
            variables: { ...codigoCatastral },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarSuministroPorCodigoCatastral } = data.catastro;
            if (buscarSuministroPorCodigoCatastral.length === 0) {
                setMensaje({ texto: MSJ_NO_HAY_USUARIOS, tipo: TIPO_ALERTA.ADVERTENCIA });
            } else {
                const numero_suministro = buscarSuministroPorCodigoCatastral[0].num_inscripcion;
                setNumeroSuministro(numero_suministro);
                buscarUsuarioEnMapa(numero_suministro);
                setMensaje({ texto: "Nombre del titular: " + buscarSuministroPorCodigoCatastral[0].nombre_titular, tipo: TIPO_ALERTA.EXITO });
            }
        }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }))
            .finally(() => setLoading(false));
    }

    function buscarUsuarioEnMapa(num_inscripcion) {
        const usuarios = map.getCapaById(CAPA_USUARIOS);
        usuarios
            .getFeatures({
                cql_filter: `suministro = ${num_inscripcion}`
            }, {
                dataProjection: 'EPSG:32717',
                featureProjection: 'EPSG:3857'
            })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', usuarios);
                    map.volarHastaUsuario(ft);
                } else {
                    setMensajeNoReferenciar(", no se puede referenciar.");
                }
            }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }));
    }

    const { idProvincia, idDistrito, idSector, idManzana, lote, sublote } = codigoCatastral;
    return (
        <TabComponentContainer>
            <form onSubmit={handleSubmit} className="mb-2">
                <label><strong>{LABEL_INGRESE_CODIGO_CATASTRAL}</strong></label>
                <div className="form-row align-items-center">
                    <InlineInputText name='idProvincia' value={idProvincia} onChange={handleInputChange} autoFocus={true} tamanio={"width-40"} maxLength={1} />
                    <InlineInputText name='idDistrito' value={idDistrito} onChange={handleInputChange} tamanio={"width-40"} maxLength={1} />
                    <InlineInputText name='idSector' value={idSector} onChange={handleInputChange} tamanio={"width-50"} maxLength={2} />
                    <InlineInputText name='idManzana' value={idManzana} onChange={handleInputChange} tamanio={"width-60"} maxLength={3} />
                    <InlineInputText name='lote' value={lote} onChange={handleInputChange} tamanio={"width-60"} maxLength={4} />
                    <InlineInputText name='sublote' value={sublote} onChange={handleInputChange} tamanio={"width-50"} maxLength={3} />
                    <ButtonSearch title={LABEL_BUSCAR} />
                </div>
            </form>
            {mensaje.texto &&
                <Alert tipo={mensaje.tipo}>
                    {mensaje.texto} {mensaje.tipo === TIPO_ALERTA.EXITO && mensajeNoReferenciar}
                    {mensaje.tipo === TIPO_ALERTA.EXITO &&
                        !mensajeNoReferenciar && <ButtonAction type={type.button} title={LABEL_LOCALIZAR} className={"btn btn-sm btn-link text-body"}
                            onClickButton={buscarUsuarioEnMapa.bind(null, numInscripcion)}>
                            <PlaneIcon />
                        </ButtonAction>
                    }
                </Alert>
            }
            {loading && <div className="text-center"><LoadingIcon /></div>}
        </TabComponentContainer>
    );
};

export default withStore(BuscarUsuarioCodigoCatastral);