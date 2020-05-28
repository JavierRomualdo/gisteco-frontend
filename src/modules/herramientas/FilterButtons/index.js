import React from 'react';
import { type } from '../../global/values';
import { LABEL_APLICAR_FILTRO, LABEL_QUITAR_FILTRO } from '../FiltroGeometrico/values';
import { CloseIcon, FilterIcon } from '../../../lib/icons';
import classnames from 'classnames';

export const ButtonGroup = ({ capa, children, ...restProps }) => {
    if (!capa) return null;
    return (<div {...restProps}>{children()}</div>)

}

export const FiltrarBtn = ({ disabled, onClick, className }) => {

    return (
        <button
            type={type.button}
            title={LABEL_APLICAR_FILTRO}
            disabled={disabled}
            className={classnames('btn btn-primary', className)}
            onClick={onClick}>
            <FilterIcon />
            <span className="d-none d-md-inline"> {LABEL_APLICAR_FILTRO} </span>
        </button>
    );
}

export const QuitarFiltroBtn = ({ visible, onClick, className }) => {

    if (!visible) return null;

    return (<button
        type={type.button}
        title={LABEL_QUITAR_FILTRO}
        className={classnames('btn btn-light', className)}
        onClick={onClick}
    >
        <CloseIcon />
        <span className="d-none d-md-inline"> {LABEL_QUITAR_FILTRO} </span>
    </button>);
}