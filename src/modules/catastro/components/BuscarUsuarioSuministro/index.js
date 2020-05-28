import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import { NUMBER_REGEXP, MSJ_NO_HAY_USUARIOS, type } from '../../../global/values';
import { BUSCAR_SUMINISTRO_CODIGO_SUMINISTRO } from './queries';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import SearchInput from '../../../global/components/SearchInput';
import { MSJ_INGRESE_CODIGO_SUMINISTRO } from './values';
import { CAPA_USUARIOS, LABEL_LOCALIZAR } from '../../../values';
import { LoadingIcon, PlaneIcon } from '../../../../lib/icons';
import ButtonAction from '../../../global/components/ButtonAction';
import { withStore } from '../../../../pages/Mapa/store/Store';

const BuscarUsuarioSuministro = ({ storeContext: { map } }) => {
    const [numInscripcion, setNumeroSuministro] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [mensajeNoReferenciar, setMensajeNoReferenciar] = useState(null);

    const client = useApolloClient();

    function handleInputChange(e) {
        const value = e.target.value;
        if (!NUMBER_REGEXP.test(value)) return;
        setNumeroSuministro(value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_SUMINISTRO_CODIGO_SUMINISTRO,
            variables: { numInscripcion },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarSuministroPorNumInscription } = data.catastro;
            if (buscarSuministroPorNumInscription.length === 0) {
                setMensaje({ texto: MSJ_NO_HAY_USUARIOS, tipo: TIPO_ALERTA.ADVERTENCIA });
            } else {
                buscarUsuarioEnMapa(buscarSuministroPorNumInscription[0].num_inscripcion);
                setMensaje({ texto: "Nombre del titular: " + buscarSuministroPorNumInscription[0].nombre_titular, tipo: TIPO_ALERTA.EXITO });
            }
        }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }))
            .finally(() => setLoading(false));
    }

    function buscarUsuarioEnMapa(num_inscripcion) {
        const capaUsuarios = map.getCapaById(CAPA_USUARIOS);
        setMensajeNoReferenciar(null);

        capaUsuarios.getFeatures({
            cql_filter: `suministro = ${num_inscripcion}`
        }, {
            dataProjection: 'EPSG:32717',
            featureProjection: map.codeProjection
        })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', capaUsuarios);
                    map.volarHastaUsuario(ft);
                } else setMensajeNoReferenciar(", ubicación desconocida.");
            });
    }

    return (
        <TabComponentContainer>
            <SearchInput value={numInscripcion}
                placeholder={MSJ_INGRESE_CODIGO_SUMINISTRO}
                autoFocus={true} maxLength={8}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit} />
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
}

export default withStore(BuscarUsuarioSuministro);