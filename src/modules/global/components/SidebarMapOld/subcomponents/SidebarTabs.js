import React from 'react';

const SidebarTabs = ({ children }) => (
    <div className="sidebar-tabs">
        <ul role="tablist">
            {children}
        </ul>
    </div>
);

export default SidebarTabs;