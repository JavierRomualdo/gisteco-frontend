import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { estadoInicial, MSJ_NO_HAY_MANZANAS, LABEL_BUSCAR_MANZANA_CODIGO_CATASTRAL, MSJ_MANZANA_NO_SE_LOCALIZO } from './values';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import { NUMBER_REGEXP, type } from '../../../global/values';
import { BUSCAR_MANZANA } from './queries';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import InlineInputText from '../../../global/components/InlineInputText';
import { CAPA_MAZANAS, LABEL_LOCALIZAR } from '../../../values';
import { LoadingIcon, PlaneIcon, SearchIcon } from '../../../../lib/icons';
import ButtonAction from '../../../global/components/ButtonAction';
import { withStore } from '../../../../pages/Mapa/store/Store';

const BuscarManzana = ({ storeContext: { map } }) => {
    const [codigoCatastral, setCodigoCatastral] = useState(estadoInicial);
    const [manzana_id, setManzanaId] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);

    const client = useApolloClient();

    function handleInputChange(e) {
        const value = e.target.value,
            name = e.target.name;

        if (value !== "") {
            if (!NUMBER_REGEXP.test(value)) return;
            setCodigoCatastral({ ...codigoCatastral, [name]: parseInt(value) });
        } else setCodigoCatastral({ ...codigoCatastral, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_MANZANA,
            variables: { ...codigoCatastral },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarManzana } = data.catastro;
            if (buscarManzana.length === 0) {
                setMensaje({ texto: MSJ_NO_HAY_MANZANAS, tipo: TIPO_ALERTA.ADVERTENCIA });
            } else {
                const manzana_id = buscarManzana[0].id;
                setManzanaId(manzana_id);
                buscarManzanaEnMapa(manzana_id);
                setMensaje({ texto: "Nombre de la manzana: " + buscarManzana[0].nombre_municipal, tipo: TIPO_ALERTA.EXITO });
            }
        }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }))
            .finally(() => setLoading(false));
    }

    function buscarManzanaEnMapa(manzana_id) {
        const manzanas = map.getCapaById(CAPA_MAZANAS);
        manzanas
            .getFeatures({
                cql_filter: `gid = ${manzana_id}`
            }, {
                dataProjection: 'EPSG:32717',
                featureProjection: 'EPSG:3857'
            })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', manzanas);
                    map.volarHastaFeature(ft);
                } else {
                    setMensaje({ texto: MSJ_MANZANA_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
                }
            }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }));
    }

    const { idProvincia, idDistrito, idSector, idManzana } = codigoCatastral;
    return (
        <TabComponentContainer>
            <form onSubmit={handleSubmit} className="mb-2">
                <label><strong>{LABEL_BUSCAR_MANZANA_CODIGO_CATASTRAL}</strong></label>
                <div className="form-row align-items-center">
                    <InlineInputText name='idProvincia' value={idProvincia} onChange={handleInputChange} autoFocus={true} tamanio={"width-40"} maxLength={1} />
                    <InlineInputText name='idDistrito' value={idDistrito} onChange={handleInputChange} tamanio={"width-40"} maxLength={1} />
                    <InlineInputText name='idSector' value={idSector} onChange={handleInputChange} tamanio={"width-50"} maxLength={2} />
                    <InlineInputText name='idManzana' value={idManzana} onChange={handleInputChange} tamanio={"width-60"} maxLength={3} />
                    <ButtonAction type={type.submit} title={LABEL_LOCALIZAR} className={"btn btn-primary btn-sm mb-2"}>
                        <SearchIcon />
                        <span className="d-none d-md-inline"> {LABEL_LOCALIZAR} </span>
                    </ButtonAction>
                </div>
            </form>
            {mensaje.texto &&
                <Alert tipo={mensaje.tipo}>
                    {mensaje.texto}
                    {mensaje.tipo === TIPO_ALERTA.EXITO &&
                        <ButtonAction type={type.button} title={LABEL_LOCALIZAR} className={"btn btn-sm btn-link text-body"}
                            onClickButton={buscarManzanaEnMapa.bind(null, manzana_id)}>
                            <PlaneIcon />
                        </ButtonAction>
                    }
                </Alert>
            }
            {loading && <div className="text-center"><LoadingIcon /></div>}
        </TabComponentContainer>
    );
}

export default withStore(BuscarManzana);