import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import {
    MSJ_NO_HAY_CALLES, PCHR_INGRESAR_CALLE, LABEL_LISTADO_CALLES, generarColumnasPaCalles,
    LABEL_TAMANIO_TABLA, MSJ_CALLE_NO_SE_LOCALIZO
} from './values';
import { BUSCAR_CALLE } from './queries';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import SearchInput from '../../../global/components/SearchInput';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import AgGrid from '../../../global/components/AgGrid';
import {
    CAPA_CALLES, LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR,
    LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR
} from '../../../values';
import { generarContextMenuItemsPorDefecto } from '../../../util';
import { withStore } from '../../../../pages/Mapa/store/Store';

const BuscarCalle = ({ storeContext: { map } }) => {

    const [calle, setCalle] = useState('');
    const [calles, setCalles] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs] = useState(generarColumnasPaCalles(handleSearchButtonClick));

    const client = useApolloClient();

    function handleInputChange(e) {
        setCalle(e.target.value.toUpperCase());
    }

    function handleSubmit(e) {
        e.preventDefault();
        gridApi.showLoadingOverlay();
        setMensaje(mensajeInicial);
        client.query({
            query: BUSCAR_CALLE,
            variables: { calle },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { buscarCalle } = data.catastro;
            buscarCalle.length === 0 ? gridApi.showNoRowsOverlay() : gridApi.hideOverlay();
            setCalles(buscarCalle);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            gridApi.showNoRowsOverlay();
            setCalles([]);
        }).finally();
    }

    function handleSearchButtonClick(calle_id) {
        const capaCalles = map.getCapaById(CAPA_CALLES);
        capaCalles.getFeatures({
            cql_filter: `gid = ${calle_id}`
        }, {
            dataProjection: 'EPSG:32717',
            featureProjection: map.codeProjection
        })
            .then(fts => {
                const ft = fts[0];
                if (ft) {
                    ft.set('capa', capaCalles);
                    map.volarHastaFeature(ft);
                } else {
                    setMensaje({ texto: MSJ_CALLE_NO_SE_LOCALIZO, tipo: TIPO_ALERTA.ADVERTENCIA });
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
            <SearchInput value={calle}
                placeholder={PCHR_INGRESAR_CALLE}
                autoFocus={true}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit} />
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            <AgGrid titulo={LABEL_LISTADO_CALLES} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={calles} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                heightTabla={LABEL_TAMANIO_TABLA} defaultColDef={{ sortable: true, resizable: true }}
                localeText={{
                    noRowsToShow: MSJ_NO_HAY_CALLES, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true} getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'calles')} />
        </TabComponentContainer>
    );
};

export default withStore(BuscarCalle);