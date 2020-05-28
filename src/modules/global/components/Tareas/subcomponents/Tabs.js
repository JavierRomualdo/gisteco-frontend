import React from 'react';
import classnames from 'classnames';
import { withStore } from '../../../../../pages/Mapa/store/Store';
import ErrorBoundary from '../../ErrorBoundary';

export const TabPill = withStore(({ tarea, active, storeContext: { tareasApi }, handleContextMenu }) => {

    return (
        <li
            className="nav-item flex-fill"
            onContextMenu={handleContextMenu.bind(null, tarea.id)}
        >
            <button className={classnames("w-100 nav-link wrap", { 'font-weight-bold active': active })}
                data-toggle="tab" role="tab"
                onClick={() => {
                    tareasApi.cambiarATarea(tarea.id)
                }}
            >
                {tarea.titulo}
                <span className="btn btn-sm right p-0" type="button" title="Cerrar"
                    onClick={(e) => {
                        e.stopPropagation();
                        tareasApi.cerrarTarea(tarea.id);
                    }}
                >
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </li>
    );
})

export const TabPane = ({ active, children }) =>
    <div className={classnames("tab-pane fade", { 'show': active, active })}
        role="tabpanel" aria-labelledby="home-tab">
        {children}
    </div>;


export const renderTabPanes = (tareas, idTareaActual) =>
    tareas.map((tarea, index) =>
        <TabPane
            key={index}
            active={tarea.id === idTareaActual}
        >
            <ErrorBoundary>
                {tarea.render()}
            </ErrorBoundary>
        </TabPane>
    );



export const renderTabPills = (tareas, idTareaActual, handleContextMenu) =>
    tareas.map((tarea, index) =>
        <TabPill
            key={index}
            tarea={tarea}
            active={tarea.id === idTareaActual}
            handleContextMenu={handleContextMenu}
        />
    );