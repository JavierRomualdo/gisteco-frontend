import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import AgGrid from '../../../../AgGrid';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../../lib/alerts';
import { LISTAR_HISTORICO_CONTROL_CALIDAD } from './queries';
import {
    LABEL_HISTORICO_CONTROL_CALIDAD, LABEL_LISTADO_HISTORICO_CONTROL_CALIDAD,
    LABEL_TAMANIO_TABLA, MSJ_NO_HAY_HISTORIAL, generarColumnasPaHistoricoControlCalidad
} from './values';
import { LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR, LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR } from '../../../../../../values';
import PanelOpciones from '../../../../Medicion/subcomponents/PanelOpciones';
import { generarContextMenuItemsPorDefecto } from '../../../../../../util';

const Historial = ({ propiedades, handleClickAtras, nombreCollapseBtnAtras }) => {
    const [historial, setHistorial] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs] = useState(generarColumnasPaHistoricoControlCalidad());

    const client = useApolloClient();

    function listarHistorialPuntoControlCalidad(gridapi) {
        gridapi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: LISTAR_HISTORICO_CONTROL_CALIDAD,
            variables: { codigo, id_tipo_fuente_abastecimiento },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { historicoControlDeCalidad } = data.comercial;
            historicoControlDeCalidad.length > 0 ? gridapi.hideOverlay() : gridapi.showNoRowsOverlay();
            setHistorial(historicoControlDeCalidad);
        }).catch((error) => {
            gridapi.showNoRowsOverlay();
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        });
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        listarHistorialPuntoControlCalidad(params.api);
    }

    function handleChangeFiltrarRapido(e) {
        setFiltroGlobal(e.target.value);
        gridApi && gridApi.setQuickFilter(e.target.value);
    }

    function redimensionarColumnas() {
        gridApi && gridApi.sizeColumnsToFit();
    }

    const { id_tipo_fuente_abastecimiento, codigo } = propiedades;
    return (
        <div>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            <AgGrid titulo={LABEL_LISTADO_HISTORICO_CONTROL_CALIDAD} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={historial} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                heightTabla={LABEL_TAMANIO_TABLA} defaultColDef={{ sortable: true, resizable: true }} isSearchFiltrar={true}
                localeText={{
                    noRowsToShow: MSJ_NO_HAY_HISTORIAL, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true} getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'historial_puntocalidad')}>
                <PanelOpciones handleAtras={handleClickAtras} nombreCollapseBtnAtras={nombreCollapseBtnAtras}
                    titulo={`${LABEL_HISTORICO_CONTROL_CALIDAD}: ${codigo}`} />
            </AgGrid>
        </div>
    );
}

export default Historial;