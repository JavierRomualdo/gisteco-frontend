import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import TabComponentContainer from '../../global/components/TabComponentContainer';
import CalendarPrime from '../../global/components/CalendarPrime';
import ButtonSearch from '../../global/components/ButtonSearch';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../lib/alerts';
import { MSJ_NO_HAY_REPORTE_FUGAS, columnDefs, LABEL_LISTADO_FUGAS, LABEL_TAMANIO_TABLA } from './values';
import { LABEL_BUSCAR } from '../../global/values';
import AgGrid from '../../global/components/AgGrid';
import { LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR, LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR } from '../../values';
import { generarContextMenuItemsPorDefecto } from '../../util';
import FormUbicacion from '../../herramientas/FiltroAvanzado/subcomponents/FormUbicacion';
import { getListaFugas } from './util';

const initialState = {
    idProvincia: '0',
    idDistrito: '0',
    fechaInicial: '',
    fechaFinal: ''
};

const ReporteFugas = () => {
    const [formData, setFormData] = useState(initialState);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [listaFugas, setListaFugas] = useState([]);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");

    const client = useApolloClient();

    function handleInputChange(e) {
        const name = e.target.name,
            value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        gridApi.showLoadingOverlay();
        setMensaje(mensajeInicial);

        getListaFugas(client, formData)
            .then(listaFugas => {
                gridApi.hideOverlay();
                if (listaFugas.length === 0) {
                    gridApi.showNoRowsOverlay();
                }
                setListaFugas(listaFugas);
            })
            .catch((error) => {
                setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            })
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
    }

    function handleChangeFiltrarRapido(e) {
        setFiltroGlobal(e.target.value);
        gridApi && gridApi.setQuickFilter(e.target.value);
    }

    const { idProvincia, idDistrito, fechaInicial, fechaFinal } = formData;

    return (
        <TabComponentContainer>
            <form onSubmit={handleSubmit}>
                <FormUbicacion
                    idProvincia={idProvincia}
                    idDistrito={idDistrito}
                    onChange={handleInputChange}
                />
                <div className="p-grid p-fluid row mb-3">
                    <CalendarPrime
                        name='fechaInicial'
                        etiqueta={'Desde'}
                        value={fechaInicial}
                        onChangeCalendar={handleInputChange}
                        showIcon={true}
                        maxDate={fechaFinal}
                        dateFormat="dd/mm/yy"
                        required
                    />
                    <CalendarPrime
                        name='fechaFinal'
                        etiqueta={'Hasta'}
                        value={fechaFinal}
                        onChangeCalendar={handleInputChange}
                        showIcon={true}
                        maxDate={new Date()}
                        minDate={fechaInicial}
                        dateFormat="dd/mm/yy"
                        required
                    />
                </div>
                <ButtonSearch title={LABEL_BUSCAR} />
            </form>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            <AgGrid titulo={LABEL_LISTADO_FUGAS} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={listaFugas} columnDefs={columnDefs} onGridReady={onGridReady} heightTabla={LABEL_TAMANIO_TABLA} isSearchFiltrar={true}
                defaultColDef={{ sortable: true, resizable: true }} localeText={{
                    noRowsToShow: MSJ_NO_HAY_REPORTE_FUGAS, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true}
                getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'fugas')} />
        </TabComponentContainer >
    );
};

export default ReporteFugas;