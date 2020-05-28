import React from 'react';
import classnames from 'classnames';

const SidebarPane = ({ titulo, active, children }) => {
    return (<div className={classnames("sidebar-pane", { active })} >
        <p className="sidebar-title">{titulo}</p>
        <div className="sidebar-body">
            {children()}
        </div>
    </div>);
};

export default SidebarPane;