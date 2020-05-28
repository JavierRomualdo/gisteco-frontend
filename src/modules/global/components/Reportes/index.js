import React, { useState } from 'react';
import TabComponentContainer from '../TabComponentContainer';
import {
    LABEL_NOTA_REPORTES, LABEL_LISTADO_REPORTES, LISTA_REPORTES, LABEL_TAMANIO_TABLA, MSJ_NO_HAY_REPORTES,
    generarColumnasPaReportes, LISTA_COLUMNAS_REPORTE_RESULTADO, PARAMETROS_REPORTE, LABEL_REPORTES_COLLAPSE
} from './values';
import AgGrid from '../AgGrid';
import { LABEL_CARGANDO, LABEL_PAGINA, LABEL_DE, LABEL_A, LABEL_COPIAR, LABEL_COPIAR_CON_ENCABEZADOS, LABEL_PEGAR } from '../../../values';
import TablaGeneral from '../TablaGeneral';
import Alert, { TIPO_ALERTA } from '../../../../lib/alerts';
import { generarContextMenuItemsPorDefecto } from '../../../util';
import { withStore } from '../../../../pages/Mapa/store/Store';

const initialContent = {
    componente: null
}

const Reportes = ({ storeContext: { map } }) => {
    const [contenido, setContenido] = useState(initialContent);
    // parametros AG-GRID
    const [gridApi, setGridApi] = useState(null);
    const [filtroGlobal, setFiltroGlobal] = useState("");
    const [columnDefs] = useState(generarColumnasPaReportes(handleReporteButtonClick, LABEL_REPORTES_COLLAPSE));

    function handleReporteButtonClick(reporte_id) {
        // Muestra la tabla
        const parametros = PARAMETROS_REPORTE[reporte_id];
        const { titulo } = parametros;
        setContenido({
            componente: () => <TablaGeneral columnas={LISTA_COLUMNAS_REPORTE_RESULTADO[reporte_id]} isSearchFiltrar={true}
                titulo={titulo} heightTabla={LABEL_TAMANIO_TABLA} handleClickAtras={handleClickAtras}
                nombreCollapse={LABEL_REPORTES_COLLAPSE} parametro={reporte_id} handleGenerarDatos={handleGenerarDatos} />
        });
    }

    function handleGenerarDatos(reporte_id) {
        const parametros = PARAMETROS_REPORTE[reporte_id];
        const capa = map.getCapaById(parametros.idCapa);
        const { cql_filter: extraFilter, aggregationAttribute, functions, groupByAttributes } = parametros;

        const conds = [];
        if (capa.getFilter()) conds.push(capa.getFilter());
        if (extraFilter) conds.push(extraFilter);
        const finalFilter = conds.join(' AND ');

        const misDatos = capa.aggregate({ cql_filter: finalFilter, aggregationAttribute, functions, groupByAttributes })
            .then(resp => resp.AggregationResults);
        return misDatos;
    }

    function handleClickAtras(e) {
        setContenido(initialContent);
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

    const { componente: Componente } = contenido;

    return (
        <TabComponentContainer>
            <div id={LABEL_REPORTES_COLLAPSE} className="collapse show">
                <Alert tipo={TIPO_ALERTA.INFORMACION}>{LABEL_NOTA_REPORTES}</Alert>
                <AgGrid titulo={LABEL_LISTADO_REPORTES} filtroGlobal={filtroGlobal} onChangeFiltro={handleChangeFiltrarRapido}
                    rowData={LISTA_REPORTES} columnDefs={columnDefs} onGridReady={onGridReady} onGridSizeChanged={redimensionarColumnas}
                    heightTabla={LABEL_TAMANIO_TABLA} defaultColDef={{ sortable: true, resizable: true }}
                    localeText={{
                        noRowsToShow: MSJ_NO_HAY_REPORTES, loadingOoo: LABEL_CARGANDO, page: LABEL_PAGINA, of: LABEL_DE,
                        to: LABEL_A, copy: LABEL_COPIAR, copyWithHeaders: LABEL_COPIAR_CON_ENCABEZADOS, paste: LABEL_PEGAR
                    }} rowSelection="multiple" allowContextMenuWithControlKey={true} getContextMenuItems={generarContextMenuItemsPorDefecto.bind(null, 'calles')} />
            </div>
            {Componente && <Componente />}
        </TabComponentContainer>
    );
}

export default withStore(Reportes);