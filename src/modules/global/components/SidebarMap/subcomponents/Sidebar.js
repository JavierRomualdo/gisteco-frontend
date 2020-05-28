import React from 'react';
import classnames from 'classnames';
import SidebarTabs from './SidebarTabs';
import SidebarPanes from './SidebarPanes';
import { withStore } from '../../../../../pages/Mapa/store/Store';

export default withStore(({ storeContext, menu }) => {

    const { sidebarAbierto, sidebarMaximizado, idTabActivo } = storeContext.store;

    return (
        <div
            id="sidebar"
            className={classnames(`sidebar`, { 'collapsed': !sidebarAbierto }, { wide: sidebarMaximizado && sidebarAbierto })}
        >
            <SidebarTabs
                menu={menu}
                idTabActivo={idTabActivo}
                sidebarAbierto={sidebarAbierto}
            />
            <SidebarPanes
                menu={menu}
                idTabActivo={idTabActivo}
            />
        </div>
    );
})