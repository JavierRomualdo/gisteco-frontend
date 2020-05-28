import React from 'react';
import './estilos.css';
import { Sidebar, RenderizarContenidoSidebar } from './subcomponents/Sidebar';
import { useQuery } from 'react-apollo-hooks';
import { MENU_SIDEBAR } from './queries';
import { LoadingIcon } from '../../../../lib/icons';

const SidebarLoading = () => <div className='sidebar collapsed'>
    <div className='sidebar-fill loading'/>
</div>

const SidebarMap = () => {
    const { loading, error, data } = useQuery(MENU_SIDEBAR);
    if (loading) return <div className='sidebar-loading' style={{ width: '100%', height: '100%' }} />
    if (error) return <></>
    return (
        // <Sidebar>
        //     <RenderizarContenidoSidebar menus={data.sistema.menuSidebar} />
        // </Sidebar>
        <SidebarLoading />
    );
}

export default SidebarMap;