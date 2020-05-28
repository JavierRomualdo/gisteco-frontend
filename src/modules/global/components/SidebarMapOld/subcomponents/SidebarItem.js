import React from 'react';
import classnames from 'classnames';
import { clickMenuSidebar } from '../../../../../pages/flux/actions';
import { useStore } from '../../../../../lib/store';

const SidebarItem = ({ disabled,id,classIcon, active }) => {
    // Menu del siderbar de la barra vertical
    const { dispatch } = useStore();

    function handleClick(e){
        dispatch(clickMenuSidebar(id));
    }

    return (<li className={classnames({ disabled, active })}>
        <a role="tab" onClick={handleClick}><i className={classIcon} ></i></a>
    </li>);
};
export default SidebarItem;