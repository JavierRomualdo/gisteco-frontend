import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import styled from 'styled-components';
import { columnDefs } from '../config';

const AgGridContainer = styled.div`
    width: 100%;
    height: 650px;
`;

/*const Header = ({ lectura }) => {
    if (lectura.id_medidor) return (
        <p>
            <strong className='mr-2'>Volumen total:</strong>
            <span>{lectura.volumen_total}</span>
        </p>
    );
    return (<p>
        <strong className='mr-2'>Datalogger:</strong>
        <span className='mr-2'>{lectura.id_datalogger}</span>
        <strong className='mr-2'>Canal:</strong>
        <span className='mr-2'>{lectura.canal}</span>
        <strong className='mr-2'>Volumen total:</strong>
        <span>{lectura.volumen_total}</span>
    </p>);
}*/

export default ({ lecturas }) => {

    const [agGridAPI, setAgGridAPI] = useState(null);

    function handleGridReady(params) {
        setAgGridAPI(params.api)
    }

    return (
        <React.Fragment>
            <AgGridContainer className='ag-theme-balham'>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={lecturas}
                    onGridReady={handleGridReady}
                    pagination={true}
                    paginationAutoPageSize={true}
                    onGridSizeChanged={() => agGridAPI.sizeColumnsToFit()}
                />
            </AgGridContainer>
        </React.Fragment>
    );
}