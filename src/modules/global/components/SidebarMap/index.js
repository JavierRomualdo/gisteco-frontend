import React from 'react';
import './estilos.css';
import { useQuery } from 'react-apollo-hooks';
import classnames from 'classnames';
import Sidebar from './subcomponents/Sidebar';
import { MENU_SIDEBAR } from './graphql/queries';

const SidebarFill = ({ loading }) => <div className='sidebar collapsed'>
    <div className={classnames('sidebar-fill', { loading })} />
</div>;

const SidebarMap = () => {
    const { loading, error, data } = useQuery(MENU_SIDEBAR);
    if (loading) return <SidebarFill />
    if (error) return <SidebarFill loading />
    return (
        <Sidebar menu={data.sistema.menuSidebar} />
    );
};

export default SidebarMap;