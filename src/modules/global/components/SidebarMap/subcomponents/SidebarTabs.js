import React from 'react';
import classnames from 'classnames';
import { withStore } from '../../../../../pages/Mapa/store/Store';

const SidebarItem = withStore(({ menuItem, active, storeContext: { sidebarApi } }) => {
    const { disabled, id, titulo, classIcon } = menuItem;
    function handleClick() {
        sidebarApi.toggleMenuSidebar(id);
    }
    return (<li className={classnames({ disabled, active })} title={titulo}>
        <span className='tab' role="tab" onClick={handleClick}><i className={classIcon} ></i></span>
    </li>);
})

const renderTabList = (menu, idTabActivo, sidebarAbierto) => {
    return menu.map((menuItem, index) =>
        <SidebarItem
            key={index}
            menuItem={menuItem}
            active={menuItem.id === idTabActivo && sidebarAbierto} />)
}

const SidebarTabs = ({ menu, idTabActivo, sidebarAbierto }) => (
    <div className="sidebar-tabs">
        <ul role="tablist">
            {renderTabList(menu, idTabActivo, sidebarAbierto)}
        </ul>
    </div>
);

export default SidebarTabs;
