import React, { useState } from 'react';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import { APROBAR_SOLICITUD_USUARIO, DESAPROBAR_SOLICITUD_USUARIO } from './mutations';
import { LISTA_SOLICITUDES_PENDIENTES } from './queries';
import { generarContextMenuItemsPorDefecto } from '../../../util';
import AgGrid from '../../../global/components/AgGrid';
import { LoadingIcon } from '../../../../lib/icons';
import {
    LABEL_CARGANDO,
    LABEL_PAGINA,
    LABEL_DE,
    LABEL_A,
    LABEL_COPIAR,
    LABEL_COPIAR_CON_ENCABEZADOS,
    LABEL_PEGAR
} from '../../../values';
import {
    MSJ_NO_HAY_SOLICITUDES,
    LABEL_LISTADO_SOLICITUDES,
    LABEL_TAMANIO_TABLA,
    generarColumnasPaSolicitudesPendientes
} from './values';
import Swal from 'sweetalert2';

const Solicitudes = ({ usuarios, actualizarListaSolicitudes }) => {
    const mensajeHayDatos = usuarios.length === 0 ? MSJ_NO_HAY_SOLICITUDES : null;

    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [columnDefs] = useState(generarColumnasPaSolicitudesPendientes(handleAprobarSolicitudUsuario, handleDesaprobarSolicitudUsuario));

    const client = useApolloClient();

    function handleAprobarSolicitudUsuario({ id: idSolicitud, nombre_completo }) {
        Swal.fire({
            title: '¡Atención!',
            text: `¿Deseas aprobar la solicitud de '${nombre_completo}?'`,
            icon: 'question',
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                aprobarSolicitudUsuario(parseInt(idSolicitud));
            }
        })
    }

    function aprobarSolicitudUsuario(idSolicitud) {
        setMensaje(mensajeInicial);
        client.mutate({
            mutation: APROBAR_SOLICITUD_USUARIO,
            variables: { idSolicitud }
        }).then(({ data }) => {
            if (data.sistema.aprobarSolicitudCreacionUsuario) {
                Swal.fire('¡Buen trabajo!', 'La solicitud fue aprobada', 'success');
                actualizarListaSolicitudes();
            }
        }).catch(error => Swal.fire('¡Algo salió mal! :(', error.message, 'error'));
    }

    function handleDesaprobarSolicitudUsuario({ id: idSolicitud, nombre_completo }) {
        Swal.fire({
            title: '¡Atención!',
            text: `¿Está seguro de desaprobar la solicitud de '${nombre_completo}'?, Escribe el motivo por favor.`,
            icon: 'question',
            input: 'text',
            inputValidator: (value) => {
                if (!value) {
                    return 'Escribe el motivo por favor.'
                }
            },
            showCancelButton: true
        }).then(result => {
            if (result.value) {
                desaprobarSolicitudUsuario(parseInt(idSolicitud), result.value);
            }
        })
    }

    function desaprobarSolicitudUsuario(idSolicitud, motivo) {
        setMensaje(mensajeInicial);
        client.mutate({
            mutation: DESAPROBAR_SOLICITUD_USUARIO,
            variables: { idSolicitud, motivo }
        }).then(({ data }) => {
            if (data.sistema.desaprobarSolicitudCreacionUsuario) {
                Swal.fire('¡Hecho!', 'La solicitud del usuario fue desaprobada', "info");
                actualizarListaSolicitudes();
            }
        }).catch(error => Swal.fire('¡Algo salió mal! :(', error.message, "error"));
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
    }

    function handleChangeFiltrarRapido(e) {
        setFiltroGlobal(e.target.value);
        gridApi && gridApi.setQuickFilter(e.target.value);
    }

    function redimensionarColumnas() {
        gridApi && gridApi.sizeColumnsToFit();
    }

    return (
        <TabComponentContainer>
            {mensajeHayDatos ?
                <Alert tipo={TIPO_ALERTA.ADVERTENCIA}>{mensajeHayDatos}</Alert> :
                <React.Fragment>
                    {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
                    <AgGrid titulo={LABEL_LISTADO_SOLICITUDES} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido} rowData={usuarios}
                        columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas} heightTabla={LABEL_TAMANIO_TABLA} isSearchFiltrar={true}
                        defaultColDef={{ sortable: true, resizable: true }} localeText={{
                            noRowsToShow: MSJ_NO_HAY_SOLICITUDES, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                            to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                        }} rowSelection="multiple" allowContextMenuWithControlKey={true}
                        getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'solicitudes')} />
                </React.Fragment>}
        </TabComponentContainer>
    );
}

const AprobarSolicitudes = () => {
    const { data, error, loading, refetch } = useQuery(LISTA_SOLICITUDES_PENDIENTES, { fetchPolicy: 'network-only' });

    if (loading) return <div className="text-center mt-4"><LoadingIcon /></div>;
    if (error) return <Alert tipo={TIPO_ALERTA.ERROR}>{error.message}</Alert>;

    return (<Solicitudes usuarios={data.sistema.solicitudesPendientesCreacionUsuario} actualizarListaSolicitudes={refetch} />);
};

export default AprobarSolicitudes;