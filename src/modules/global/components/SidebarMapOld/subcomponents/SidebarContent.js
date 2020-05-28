import React from 'react';
import classnames from 'classnames';
import { useStore } from '../../../../../lib/store';
import { cerrarSidebar, redimensionarSidebar } from '../../../../../pages/flux/actions';

const SidebarContent = ({ children }) => {
    const { dispatch, getStore } = useStore();
    const { sidebarMaximizado } = getStore();

    function handleClickCerrarSiderbar(e) {
        dispatch(cerrarSidebar());
    }

    function handleClickResizeSiderbar(e) {
        dispatch(redimensionarSidebar());
    }

    return (<div className="sidebar-content sticky-top">
        {children}
        <ul className="sidebar-controls">
            <li onClick={handleClickCerrarSiderbar} title="Minimizar">
                <i className="fa fa-caret-left" />
            </li>
            <li onClick={handleClickResizeSiderbar} title={sidebarMaximizado ? "Restaurar" : "Maximizar"}>
                <i className={classnames({ "far fa-window-restore": sidebarMaximizado, "far fa-window-maximize": !sidebarMaximizado, })} />
            </li>
        </ul>
    </div>);
}

export default SidebarContent;