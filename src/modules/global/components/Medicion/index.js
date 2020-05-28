import React, { useState } from 'react';
import { withStore } from '../../../../pages/Mapa/store/Store';
import styled, { css } from 'styled-components';
import AgGridWithSimpleMenuBar from '../AgGridWithSimpleMenuBar';
import { actionsDef, columnDefs, ZOOM_OVER, DELETE, defaultColDef } from './config';
import FeaturesCapa from '../FeaturesCapa';
import { formatFeatures } from './util';
import FeatureDrawer from '../FeatureDrawer';
import VisibilityButton from './subcomponents/VisibilityButton';

const AgGrid = styled(AgGridWithSimpleMenuBar)`
    width: 100%;
    height: 540px;
`;

const MEDICION_DISTANCIA = 'MEDICION_DISTANCIA',
    MEDICION_AREA = 'MEDICION_AREA';

const Button = styled.button`
    ${props => props.selected && css`
        border: 1px solid #343a40;
    `}    
`;


export default withStore(({ storeContext: { map } }) => {
    const [gridApi, setGridApi] = useState(null);
    const [selected, setSelected] = useState([]);
    const source = map.medidas.getSource();

    function handleBarMenuAction(actionId) {
        switch (actionId) {
            case ZOOM_OVER:
                map.zoomSobreFeatures(selected.map(el => el.ft));
                break;
            case DELETE:
                selected.forEach(el => source.removeFeature(el.ft))
                gridApi.deselectAll();
                break;
            default:
                throw new Error('Acción desconocida')
        }
    }

    function handleGridReady(params) {
        setGridApi(params.api);
    }

    function handleSelectionChanged() {
        const selected = gridApi.getSelectedRows();
        setSelected(selected);
        // highlight selected
        source.getFeatures().forEach(ft => ft.set('strong', null));
        selected.forEach(el => el.ft.set('strong', true));
    }

    return (
        <div className="p-2">
            <label className="font-weight-bold">Figuras</label>
            <div>
                <FeatureDrawer
                    tarea={MEDICION_DISTANCIA}
                    shape='Line'
                    source={source}
                    stopClick={true}
                    snapping={true}
                >
                    {(start, finish, { active }) => {
                        return (
                            <Button
                                selected={active}
                                className="btn btn-light btn-sm"
                                onClick={() => {
                                    if (active) finish();
                                    else start();
                                }}
                            >
                                <i className='fa fa-slash' />
                            </Button>
                        )
                    }}
                </FeatureDrawer>
                <FeatureDrawer
                    tarea={MEDICION_AREA}
                    shape='Polygon'
                    source={source}
                    snapping={true}
                    stopClick={true}
                >
                    {(start, finish, { active }) => {
                        return (
                            <Button
                                selected={active}
                                className="btn btn-light btn-sm ml-2"
                                onClick={() => {
                                    if (active) finish();
                                    else start();
                                }}
                            >
                                <i className='fas fa-draw-polygon' />
                            </Button>
                        )
                    }}
                </FeatureDrawer>
            </div>
            <label className="font-weight-bold my-2">Visibilidad: <VisibilityButton capa={map.medidas} /></label>
            <FeaturesCapa
                capa={map.medidas}
                format={formatFeatures}
            >
                {(fts) => {
                    return (
                        <AgGrid
                            barTitle="Medidas"
                            actionsDef={actionsDef}
                            onBarMenuAction={handleBarMenuAction}
                            defaultColDef={defaultColDef}
                            columnDefs={columnDefs}
                            rowData={fts}
                            onGridReady={handleGridReady}
                            rowSelection='multiple'
                            rowDeselection={true}
                            selectedRows={selected}
                            onSelectionChanged={handleSelectionChanged}
                            localeText={{
                                noRowsToShow: 'No hay medidas',
                                loadingOoo: 'Cargando...'
                            }}
                            onGridSizeChanged={() => gridApi.sizeColumnsToFit()}
                        />
                    )
                }}
            </FeaturesCapa>

        </div>
    );
})