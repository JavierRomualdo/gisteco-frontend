import React from 'react';
import { withStore } from '../../store/Store';

export const TabLink = withStore(({ menuItem, storeContext: { tareasApi } }) => {

    return (
        <button
            className="dropdown-item"
            onClick={() => {
                const { componenteId, titulo } = menuItem;
                tareasApi.abrirTarea({ componenteId, titulo });
            }}
        >
            {menuItem.titulo}
        </button >
    );
})

export default ({ menuItem }) => {
    if (menuItem.componenteId) return <TabLink menuItem={menuItem} />;
    return null;
}