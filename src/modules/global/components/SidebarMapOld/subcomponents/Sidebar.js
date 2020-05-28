import React from 'react';
import classnames from 'classnames';
import { useStore } from '../../../../../lib/store';
import SidebarTabs from './SidebarTabs';
import SidebarContent from './SidebarContent';
import SidebarItem from './SidebarItem';
import SidebarPane from './SidebarPane';
import { mapeadorSiderbar } from '../lib';

export const Sidebar = ({ children }) => {
    const { getStore } = useStore();
    const {sidebarAbierto,sidebarMaximizado} = getStore();

    return (<div id="sidebar" className={classnames(`sidebar`,
        { 'collapsed': !sidebarAbierto }, { wide: sidebarMaximizado && sidebarAbierto })}>
        {children}
    </div>);
};

export const RenderizarContenidoSidebar = ({menus}) => {
    const { getStore } = useStore();
    const tabList = [], tabPanes = [];
    const { sidebarAbierto, idTabActivo, tareas, idTareaActual } = getStore();

    for (let index = 0; index < menus.length; index++) {
        const { titulo, id, classIcon } = menus[index];
        const active = id === idTabActivo;
        const Componente = mapeadorSiderbar[id] || null;
        const props = id === 'tareas' ? { tareas, idTareaActual } : {};
        tabList.push(<SidebarItem key={index} id={id} classIcon={classIcon} active={active && sidebarAbierto} />);
        tabPanes.push(<SidebarPane key={index} id={id} titulo={titulo} active={active} >
            {() => (Componente && <Componente {...props} />)}
        </SidebarPane>);
    }
    return (
        <React.Fragment>
            <SidebarTabs>{tabList}</SidebarTabs>
            <SidebarContent>{tabPanes}</SidebarContent>
        </React.Fragment>
    );
};