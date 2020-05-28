import React from 'react';
import { Route } from 'react-router-dom';
import useIsAuthenticated from './useIsAuthenticated';

export const RouteWithAuth = ({ render, ...restProps }) => {
    const authResult = useIsAuthenticated();
    return <Route
        {...restProps}
        render={render.bind(null, authResult)}
    />
}