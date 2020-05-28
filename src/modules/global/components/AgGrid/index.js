import React from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import SearchFiltrar from '../SearchFilter';

const AgGrid = ({filtroGlobal, onChangeFiltro, heightTabla, children, isSearchFiltrar, ...otrasPropiedades}) => (
    <div className="form-group">
        {isSearchFiltrar && <SearchFiltrar filtroGlobal={filtroGlobal} onChangeFiltro={onChangeFiltro} isLargo={false}/>}
        {children}
        <div style={{height: heightTabla, width: "100%"}} className="ag-theme-balham">
            <AgGridReact
                paginationAutoPageSize={true}
                pagination={true}
                {...otrasPropiedades}
            />
        </div>
    </div>
);

export default AgGrid;