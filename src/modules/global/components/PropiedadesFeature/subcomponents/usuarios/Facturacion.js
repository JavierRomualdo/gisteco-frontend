import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import {
    generarColumnasPaFacturacionSuministro, LABEL_LISTADO_FACTURACION_SUMINISTRO,
    MSJ_NO_HAY_FACTURACIONES, LABEL_TAMANIO_TABLA
} from './values';
import { LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR, LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR } from '../../../../../values';
import AgGrid from '../../../AgGrid';
import { LISTAR_FACTURACION_SUMINISTRO } from './queries';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../lib/alerts';
import PanelOpciones from '../../../Medicion/subcomponents/PanelOpciones';
import { LABEL_SUMINISTRO } from '../../../../../catastro/components/GeoreferenciarUsuario/values';
import { generarContextMenuItemsPorDefecto } from '../../../../../util';
import withDashboardControl from '../../../Informacion/subcomponents/withDashboardControl';
import { INFO_COLLAPSE_ID } from '../../../Informacion/values';

const Facturacion = ({
    suministro,
    nombre_usuario,
    dashboardControl: { regresar }
}) => {

    const [facturaciones, setFacturaciones] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs] = useState(generarColumnasPaFacturacionSuministro());

    const client = useApolloClient();

    function listarFacturacionUsuario(gridapi) {
        gridapi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: LISTAR_FACTURACION_SUMINISTRO,
            variables: { suministro },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { facturacionUsuario } = data.comercial;
            facturacionUsuario.length > 0 ? gridapi.hideOverlay() : gridapi.showNoRowsOverlay();
            setFacturaciones(facturacionUsuario);
        }).catch((error) => {
            gridapi.showNoRowsOverlay();
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        });
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
        listarFacturacionUsuario(params.api);
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
            <AgGrid titulo={LABEL_LISTADO_FACTURACION_SUMINISTRO} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={facturaciones} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                heightTabla={LABEL_TAMANIO_TABLA} defaultColDef={{ sortable: true, resizable: true }} isSearchFiltrar={true}
                localeText={{
                    noRowsToShow: MSJ_NO_HAY_FACTURACIONES, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true} getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'facturacion_usuario')}>
                <PanelOpciones handleAtras={regresar} nombreCollapseBtnAtras={INFO_COLLAPSE_ID}
                    titulo={`${LABEL_SUMINISTRO}: ${suministro} ${nombre_usuario && ` - ${nombre_usuario}`}`} />
            </AgGrid>
        </div>
    );
};

export default withDashboardControl(Facturacion);