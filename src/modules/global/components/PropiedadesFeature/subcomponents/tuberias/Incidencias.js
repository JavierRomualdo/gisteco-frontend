import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { generarColumnasPaHistorialIncidencias, LABEL_HISTORIAL_INCIDENCIAS, MSJ_NO_HAY_INCIDENCIAS, LABEL_TAMANIO_TABLA } from './values';
import { LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR, LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR } from '../../../../../values';
import AgGrid from '../../../AgGrid';
import PanelOpciones from '../../../Medicion/subcomponents/PanelOpciones';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../lib/alerts';
import { LISTAR_HISTORICO_FUGA_TUBERIA } from './queries';
import { generarContextMenuItemsPorDefecto } from '../../../../../util';
import withDashboardControl from '../../../Informacion/subcomponents/withDashboardControl';
import { INFO_COLLAPSE_ID } from '../../../Informacion/values';

const Incidencias = ({ gidTuberia, dashboardControl: { regresar } }) => {
    const [incidencias, setFacturaciones] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs] = useState(generarColumnasPaHistorialIncidencias());

    const client = useApolloClient();

    function listarIncidenciasTuberia(gridapi) {
        gridapi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: LISTAR_HISTORICO_FUGA_TUBERIA,
            variables: { gidTuberia, tipoElemento: 'RED AGUA' },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listaFugasTuberia } = data.operaciones;
            listaFugasTuberia.length > 0 ? gridapi.hideOverlay() : gridapi.showNoRowsOverlay();
            setFacturaciones(listaFugasTuberia);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        });
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
        listarIncidenciasTuberia(params.api);
    }

    function handleChangeFiltrarRapido(e) {
        setFiltroGlobal(e.target.value);
        gridApi && gridApi.setQuickFilter(e.target.value);
    }

    function redimensionarColumnas() {
        gridApi && gridApi.sizeColumnsToFit();
    }

    return (
        <div>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            <AgGrid titulo={LABEL_HISTORIAL_INCIDENCIAS} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={incidencias} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                heightTabla={LABEL_TAMANIO_TABLA} defaultColDef={{ sortable: true, resizable: true }} isSearchFiltrar={true}
                localeText={{
                    noRowsToShow: MSJ_NO_HAY_INCIDENCIAS, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true} getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'incidencias_tuberia')}>
                <PanelOpciones handleAtras={regresar} nombreCollapseBtnAtras={INFO_COLLAPSE_ID} titulo={`${LABEL_HISTORIAL_INCIDENCIAS}: ${gidTuberia}`} />
            </AgGrid>
        </div>
    );
}

export default withDashboardControl(Incidencias);