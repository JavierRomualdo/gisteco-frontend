import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import styled from 'styled-components';
import { getContextMenuItems, localeText } from './config';

const TopBar = ({ title }) => <strong className='text-white'>{title}</strong>

const ActionButton = ({ children, ...restProps }) =>
    <button type="button" className="card-header-action btn btn-sm bt-secundary btn-sm pb-0 pt-0 text-white" {...restProps}>{children}</button>

const TopBarMenu = ({ selected, actionsDef = [], onAction }) => {
    return (
        <div className='d-flex justify-content-between'>
            <strong className='text-white'>{selected.length} seleccionado(s)</strong>
            <div>
                {actionsDef.map((def, index) => {
                    return (<ActionButton key={index} title={def.title} onClick={onAction.bind(null, def.id)}>
                        <i className={def.icon} />
                    </ActionButton>)
                })}
            </div>
        </div>
    );
}

const AgGridContainer = styled.div`
    width: 100%;
    height: 100%;
`

export default ({
    className,
    actionsDef,
    barTitle,
    onBarMenuAction,
    selectedRows,
    /* agGrid properties */
    localeText: locText,
    ...otherAgGridOptions
}) => {

    return (
        <div className={className}>
            <div className='bg-primary p-1'>
                {
                    selectedRows.length ?
                        <TopBarMenu
                            actionsDef={actionsDef}
                            selected={selectedRows}
                            onAction={onBarMenuAction}
                        /> :
                        <TopBar title={barTitle} />
                }
            </div>
            <AgGridContainer
                className='ag-theme-balham'
            >
                <AgGridReact
                    {...otherAgGridOptions}
                    getContextMenuItems={getContextMenuItems}
                    localeText={{ ...locText, ...localeText }}
                />
            </AgGridContainer>
        </div>
    );
}