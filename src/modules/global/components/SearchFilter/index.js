import React from 'react';
import classnames from 'classnames';

const SearchFiltrar = ({filtroGlobal, isLargo, onChangeFiltro}) => (
    <div className="row">
        <div className={classnames({ "col-sm-12 col-md-12": isLargo }, { "col-sm-5 col-md-6": !isLargo })}>
            <div className="input-group p-1">
                <input type="text" value={filtroGlobal} onChange={onChangeFiltro} className="form-control form-control-sm input-filter mousetrap"
                placeholder="Filtrar..."/>
                <div className="input-group-append">
                    <span className="input-group-text">
                        <i className="fa fa-search"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
);

export default SearchFiltrar;