import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import { BUSCAR_SERIE_MEDIDOR } from './queries';
import { MSJ_NO_HAY_USUARIOS, type } from '../../../global/values';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import SearchInput from '../../../global/components/SearchInput';
import { MSJ_INGRESAR_NUM_SERIE_MEDIDOR } from './values';
import { LoadingIcon, PlaneIcon } from '../../../../lib/icons';
import { CAPA_USUARIOS, LABEL_LOCALIZAR } from '../../../values';
import ButtonAction from '../../../global/components/ButtonAction';
import { withStore } from '../../../../pages/Mapa/store/Store';

const BuscarUsuarioMedidor = ({ storeContext: { map } }) => {
    const [numMedidor, setNumMedidor] = useState('');
    const [numInscripcion, setNumeroSuministro] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [mensajeNoReferenciar, setMensajeNoReferenciar] = useState(null);

    const client = useApolloClient();

    function handleInputChange(e) {
        setNumMedidor(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setMensaje(mensajeInicial);
        setLoading(true);
        client.query({
            query: BUSCAR_SERIE_MEDIDOR,
            variables: { numMedidor },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarSuministroPorNumMedidor } = data.catastro;
            if (buscarSuministroPorNumMedidor.length === 0) {
                setMensaje({ texto: MSJ_NO_HAY_USUARIOS, tipo: TIPO_ALERTA.ADVERTENCIA });
            } else {
                const numero_suministro = buscarSuministroPorNumMedidor[0].num_inscripcion;
                setNumeroSuministro(numero_suministro);
                buscarUsuarioEnMapa(numero_suministro);
                setMensaje({ texto: "Nombre del titular: " + buscarSuministroPorNumMedidor[0].nombre_titular, tipo: TIPO_ALERTA.EXITO });
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

    return (
        <TabComponentContainer>
            <SearchInput value={numMedidor}
                placeholder={MSJ_INGRESAR_NUM_SERIE_MEDIDOR}
                autoFocus={true}
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

export default withStore(BuscarUsuarioMedidor);