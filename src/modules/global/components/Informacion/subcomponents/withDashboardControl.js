import React from 'react';
import { DashboardContext } from './Dashboard';

export default (component) => {
    const Component = component;
    return (props) => <DashboardContext.Consumer>
        {(control) => <Component dashboardControl={control} {...props} />}
    </DashboardContext.Consumer>;
}