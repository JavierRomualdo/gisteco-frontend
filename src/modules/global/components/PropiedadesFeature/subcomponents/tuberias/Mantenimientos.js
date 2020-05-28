import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import {
    generarColumnasPaHistorialMantenimientos, LABEL_HISTORIAL_MANTENIMIENTOS,
    LABEL_TAMANIO_TABLA, MSJ_NO_HAY_MANTENIMIENTOS
} from './values';
import AgGrid from '../../../AgGrid';
import { LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR, LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR } from '../../../../../values';
import PanelOpciones from '../../../Medicion/subcomponents/PanelOpciones';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../lib/alerts';
import { LISTAR_MANTENIMIENTO_TUBERIA } from './queries';
import { generarContextMenuItemsPorDefecto } from '../../../../../util';
import withDashboardControl from '../../../Informacion/subcomponents/withDashboardControl';
import { INFO_COLLAPSE_ID } from '../../../Informacion/values';

const Mantenimientos = ({ gidTuberia, tuberiaPertenece, dashboardControl: { regresar } }) => {
    const [mantenimientos, setMantenimientos] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs] = useState(generarColumnasPaHistorialMantenimientos());

    const client = useApolloClient();

    function listarMantenimientosTuberia(gridapi) {
        gridapi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: LISTAR_MANTENIMIENTO_TUBERIA,
            variables: { gidTuberia, tuberiaPertenece },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listaMantenimientosTuberia } = data.operaciones;
            listaMantenimientosTuberia.length > 0 ? gridapi.hideOverlay() : gridapi.showNoRowsOverlay();
            setMantenimientos(listaMantenimientosTuberia);
        }).catch((error) => {
            gridapi.showNoRowsOverlay();
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        });
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
        listarMantenimientosTuberia(params.api);
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
            <AgGrid titulo={LABEL_HISTORIAL_MANTENIMIENTOS} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={mantenimientos} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                heightTabla={LABEL_TAMANIO_TABLA} defaultColDef={{ sortable: true, resizable: true }} isSearchFiltrar={true}
                localeText={{
                    noRowsToShow: MSJ_NO_HAY_MANTENIMIENTOS, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true} getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'mantenimientos_tuberia')}>
                <PanelOpciones handleAtras={regresar} nombreCollapseBtnAtras={INFO_COLLAPSE_ID}
                    titulo={`${LABEL_HISTORIAL_MANTENIMIENTOS}: ${gidTuberia}`} />
            </AgGrid>
        </div>
    );
}

export default withDashboardControl(Mantenimientos);