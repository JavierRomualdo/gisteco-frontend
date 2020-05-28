import React from 'react';
import classnames from 'classnames';
import { resolveComponente } from '../mapper';
import { withStore } from '../../../../../pages/Mapa/store/Store';

const SidebarPane = ({ menuItem, active, children }) => {
    const { titulo } = menuItem;
    return (<div className={classnames("sidebar-pane", { active })} >
        <p className="sidebar-title">{titulo}</p>
        <div className="sidebar-body">
            {children()}
        </div>
    </div>);
};

const renderTabPanes = (menu, idTabActivo) => {
    return menu.map((menuItem, index) => {
        const Componente = resolveComponente(menuItem.id) || null;
        return <SidebarPane
            key={index}
            menuItem={menuItem}
            active={menuItem.id === idTabActivo}
        >
            {() => (Componente && <Componente />)}
        </SidebarPane>
    })
};

const SidebarContent = withStore(({ sidebarMaximizado, children, storeContext: { sidebarApi } }) => {

    function handleClickCerrarSiderbar(e) {
        sidebarApi.cerrarSidebar();
    }

    function handleClickResizeSiderbar(e) {
        sidebarApi.redimensionarSidebar();
    }

    return (<div className="sidebar-content sticky-top">
        {children}
        <ul className="sidebar-controls">
            <li
                onClick={handleClickCerrarSiderbar}
                title="Minimizar">
                <i className="fa fa-caret-left" />
            </li>
            <li
                onClick={handleClickResizeSiderbar}
                title={sidebarMaximizado ? "Restaurar" : "Maximizar"}>
                <i className={classnames({ "far fa-window-restore": sidebarMaximizado, "far fa-window-maximize": !sidebarMaximizado, })} />
            </li>
        </ul>
    </div>);
})

const SidebarPanes = ({ menu, idTabActivo, sidebarMaximizado }) =>
    <SidebarContent sidebarMaximizado={sidebarMaximizado}>
        {renderTabPanes(menu, idTabActivo)}
    </SidebarContent>;

export default SidebarPanes;