import React from 'react';
import { SearchIcon } from '../../../../lib/icons';

const ButtonSearch = ({title}) => {
    return (
        <button type="submit" className="btn btn-primary btn-sm mb-2" title="Buscar">
            <SearchIcon/>
            <span className="d-none d-md-inline"> {title} </span>
        </button>
    );
}


export default ButtonSearch;