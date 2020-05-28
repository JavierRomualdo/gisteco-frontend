import React, { useState, useEffect } from 'react';
import AgGrid from '../AgGrid';
import { generarColumnasGeneral } from './values';
import { LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR, LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR } from '../../../values';
import PanelOpciones from '../Medicion/subcomponents/PanelOpciones';
import { MSJ_NO_HAY_REPORTES } from '../Reportes/values';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import { generarContextMenuItemsPorDefecto } from '../../../util';

const TablaGeneral = ({ columnas, titulo, handleClickAtras, nombreCollapse, parametro, handleGenerarDatos, heightTabla, isSearchFiltrar }) => {
    const [rowData, setRowData] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [, setGridColumnApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs, setColumnDefs] = useState([]);

    useEffect(() => {
        setColumnDefs(generarColumnasGeneral(columnas));
    }, [columnas]);

    function generarRowData(columnas, datos) {
        const arrData = [];
        datos.forEach(data => {
            const fila = {};
            columnas.forEach((columna, index) => {
                fila[columna] = data[index];
            });
            arrData.push(fila);
        });
        return arrData;
    }

    function obtenerDatosTabla(gridapi) {
        // Obtener los datos de la tabla
        setMensaje(mensajeInicial);
        gridapi.showLoadingOverlay();
        handleGenerarDatos(parametro)
            .then(data => {
                data.length === 0 ? gridapi.showNoRowsOverlay() : gridapi.hideOverlay();
                setRowData(generarRowData(columnas, data));
            })
            .catch(error => {
                gridapi.showNoRowsOverlay();
                setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            });
    }

    // funciones ag-grid
    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        obtenerDatosTabla(params.api);
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
            <AgGrid titulo={titulo} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                rowData={rowData} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                heightTabla={heightTabla} defaultColDef={{ sortable: true, resizable: true }} isSearchFiltrar={isSearchFiltrar}
                localeText={{
                    noRowsToShow: MSJ_NO_HAY_REPORTES, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                    to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                }} rowSelection="multiple" allowContextMenuWithControlKey={true} getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, `${titulo}`)}>
                <PanelOpciones handleClickActualizar={obtenerDatosTabla.bind(null, gridApi)} nombreCollapseBtnAtras={nombreCollapse}
                    handleAtras={handleClickAtras} titulo={`${titulo}`} />
            </AgGrid>
        </div>
    );
}

export default TablaGeneral;