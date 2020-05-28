import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { BUSCAR_HABILITACION_URBANA } from './queries';
import {
    MSJ_NO_HAY_HABILITACION_URBANA, PCHR_INGRESAR_HABILITACION_URBANA,
    LABEL_LISTADO_HABILITACIONES_URBANAS, generarColumnasPaHabilitacionesUrbanas,
    LABEL_TAMANIO_TABLA, MSJ_HABILITACION_URBANA_NO_SE_LOCALIZO
} from './values';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import SearchInput from '../../../global/components/SearchInput';
import AgGrid from '../../../global/components/AgGrid';
import {
    CAPA_HABILITACIONES_URBANAS, LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR,
    LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR
} from '../../../values';
import { generarContextMenuItemsPorDefecto } from '../../../util';
import { withStore } from '../../../../pages/Mapa/store/Store';

const BuscarHabilitacionUrbana = ({ storeContext: { map } }) => {

    const [habilitacionUrbana, setUrbanizacion] = useState('');
    const [urbanizaciones, setUrbanizaciones] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs] = useState(generarColumnasPaHabilitacionesUrbanas(handleSearchButtonClick));

    const client = useApolloClient();

    function handleInputChange(e) {
        setUrbanizacion(e.target.value.toUpperCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        gridApi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_HABILITACION_URBANA,
            variables: { habilitacionUrbana },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarHabilitacionUrbana } = data.catastro;
            buscarHabilitacionUrbana.length === 0 ? gridApi.showNoRowsOverlay() : gridApi.hideOverlay();
            setUrbanizaciones(buscarHabilitacionUrbana);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            gridApi.showNoRowsOverlay();
        });
    }

    function handleSearchButtonClick(urbanizacion_id) {
        const habUrbanas = map.getCapaById(CAPA_HABILITACIONES_URBANAS);
        habUrbanas
            .getFeatures({
                cql_filter: `gid = ${urbanizacion_id}`
            }, {
                dataProjection: 'EPSG:32717',
                featureProjection: 'EPSG:3857'
            })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', habUrbanas
                    );
                    map.volarHastaFeature(ft);
                } else {
                    setMensaje({ texto: MSJ_HABILITACION_URBANA_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
                }
            }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }));
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
            <SearchInput value={habilitacionUrbana}
                placeholder={PCHR_INGRESAR_HABILITACION_URBANA}
                autoFocus={true}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit} />
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            <AgGrid titulo={LABEL_LISTADO_HABILITACIONES_URBANAS} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={urbanizaciones} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                heightTabla={LABEL_TAMANIO_TABLA} defaultColDef={{ sortable: true, resizable: true }}
                localeText={{
                    noRowsToShow: MSJ_NO_HAY_HABILITACION_URBANA, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true}
                getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'habilitaciones_urbanas')} />
        </TabComponentContainer>
    );
};

export default withStore(BuscarHabilitacionUrbana);