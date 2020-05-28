import React, { useState } from 'react';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import InputText from '../../../global/components/InputText';
import {
    PCHR_EJEMPLO_COORDENADAS,
    LABEL_INGRESE_COORDENADAS
} from './values';
import ButtonAction from '../../../global/components/ButtonAction';
import { type, LABEL_ACEPTAR } from '../../../global/values';
import { CheckIcon } from '../../../../lib/icons';
import SelectOption from '../../../global/components/SelectOption';
import { LISTA_PROYECCIONES } from '../ConvertirCoordenadas/values';
import { transform } from 'ol/proj';
import Alert, { TIPO_ALERTA, mensajeInicial } from '../../../../lib/alerts';
import styled from 'styled-components';
import AgGridWithSimpleMenuBar from '../../../global/components/AgGridWithSimpleMenuBar';
import { columnDefs, actionsDef, BAR_MENU_ACTION, formatFeatures } from './config';
import FeaturesCapa from '../../../global/components/FeaturesCapa';
import { withStore } from '../../../../pages/Mapa/store/Store';
import VisibilityButton from '../../../global/components/Medicion/subcomponents/VisibilityButton';

const AgGrid = styled(AgGridWithSimpleMenuBar)`
    margin-top: 10px;
    width: 100%;
    height: 450px;
`;

const initFormData = { crs: LISTA_PROYECCIONES[1].id, coordinate: '' };

const zoom = (map, marker) => {
    map.volarHastaFeature(marker, { maxZoom: 18 }, false);
}

const LocalizarCoordenadas = ({ storeContext: { map } }) => {
    const [formData, setFormData] = useState(initFormData);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [selected, setSelected] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    function handleInputChange(e) {
        const name = e.target.name,
            value = e.target.value;
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setMensaje(mensajeInicial);
        try {
            const coords = formData.coordinate.split(',').map(c => parseFloat(c.trim()));
            const tcoords = transform(coords, formData.crs, map.codeProjection);
            if (isNaN(tcoords[0]) || isNaN(tcoords[1])) throw new Error('Coordenadas inválidas');
            const marker = map.agregarMarcador(tcoords, { 'display_crs': formData.crs });
            zoom(map, marker);
        } catch (error) {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ADVERTENCIA });
        }
    }

    function handleGridReady(params) {
        setGridApi(params.api);
    }

    function handleSelectionChanged() {
        setSelected(gridApi.getSelectedRows());
    }

    function handleBarMenuAction(actionId) {
        switch (actionId) {
            case BAR_MENU_ACTION.ZOOM:
                zoom(map, selected[0].ft);
                break;
            case BAR_MENU_ACTION.DELETE:
                selected.forEach(rowData => map.marcadores.getSource().removeFeature(rowData.ft));
                gridApi.deselectAll();
                break;
            default:
                throw new Error('Acctión desconocida');
        }
    }

    return (
        <TabComponentContainer>
            <form onSubmit={handleSubmit}>
                <SelectOption name='crs' value={formData.crs} etiqueta={"Sistema"} lista={LISTA_PROYECCIONES} onChangeSelect={handleInputChange}
                    required autoFocus={true} />
                <InputText name='coordinate' value={formData.coordinate} etiqueta={LABEL_INGRESE_COORDENADAS} placeholder={PCHR_EJEMPLO_COORDENADAS}
                    onChangeInput={handleInputChange} autoFocus={true} required />
                <ButtonAction type={type.submit} title={LABEL_ACEPTAR} className={"btn btn-primary btn-sm mb-2"}>
                    <CheckIcon />
                    <span className="d-none d-md-inline"> {LABEL_ACEPTAR} </span>
                </ButtonAction>
                <label className="ml-2 font-weight-bold my-2">Visibilidad: <VisibilityButton capa={map.marcadores} /></label>
                {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            </form>
            <FeaturesCapa
                capa={map.marcadores}
                format={formatFeatures}
            >
                {(rowData) =>
                    <AgGrid
                        barTitle="Lista de ubicaciones"
                        actionsDef={actionsDef}
                        columnDefs={columnDefs(map)}
                        rowData={rowData}
                        rowSelection='single'
                        rowDeselection={true}
                        selectedRows={selected}
                        localeText={{
                            noRowsToShow: 'No hay datos',
                            loadingOoo: 'Cargando...'
                        }}
                        onBarMenuAction={handleBarMenuAction}
                        onGridReady={handleGridReady}
                        onSelectionChanged={handleSelectionChanged}
                    />}
            </FeaturesCapa>

        </TabComponentContainer>
    );
}

export default withStore(LocalizarCoordenadas);