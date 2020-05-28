import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useApolloClient } from 'react-apollo-hooks';
import { PUNTOS_CONTROL } from './queries';
import { verEnMapa } from './actionsListener';
import { columnDefs, actionsDef, VER_EN_MAPA_ACTION, VER_LECTURAS_ACTION, defaultColDef } from './values';
import AgGridWithSimpleMenuBar from '../../global/components/AgGridWithSimpleMenuBar';
import { withStore } from '../../../pages/Mapa/store/Store';
import { LECTURAS_PUNTO_CONTROL } from '../../../pages/Mapa/store/tareas/mapper';
import Swal from 'sweetalert2';

const AgGrid = styled(AgGridWithSimpleMenuBar)`
    width: 100%;
    height: 650px;
`;

export default withStore(({ tipoPuntoControl, storeContext: { map, tareasApi } }) => {
    const [agGridAPI, setAgGridAPI] = useState(null);
    const [selectedPC, setSelectedPC] = useState([]);
    const [puntosControl, setPuntosControl] = useState(null)
    const apollo = useApolloClient();

    useEffect(() => {
        apollo.query({
            query: PUNTOS_CONTROL,
            variables: { tipo: tipoPuntoControl }
        })
            .then(({ data }) => setPuntosControl(data.telemetria.puntosControl))
            .catch(error => Swal.fire('¡Error!', error.message, 'error'));
    }, [apollo, tipoPuntoControl]);

    function capturarObjAgGridApi(params) {
        setAgGridAPI(params.api);
    }

    function handleSelectionChanged() {
        const selected = agGridAPI.getSelectedRows();
        setSelectedPC(selected);
    }

    function handleTopBarMenuAction(actionId) {
        const [selected] = selectedPC;

        switch (actionId) {
            case VER_EN_MAPA_ACTION:
                verEnMapa(tipoPuntoControl, selected, map);
                break;
            case VER_LECTURAS_ACTION:
                tareasApi.abrirTarea({
                    componenteId: LECTURAS_PUNTO_CONTROL,
                    props: { puntoControl: selected },
                    reload: true
                })
                break;
            default:
                throw new Error('Acción desconocida');
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col mt-2'>
                    <AgGrid
                        barTitle="Lista de puntos de control"
                        actionsDef={actionsDef}
                        selectedRows={selectedPC}
                        onBarMenuAction={handleTopBarMenuAction}
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={puntosControl}
                        onGridReady={capturarObjAgGridApi}
                        rowSelection='single'
                        rowDeselection={true}
                        onSelectionChanged={handleSelectionChanged}
                        localeText={{
                            noRowsToShow: 'No hay puntos de control',
                            loadingOoo: 'Cargando...'
                        }}
                        onGridSizeChanged={() => agGridAPI.sizeColumnsToFit()}
                    />
                </div>
            </div>
        </div>
    )
})