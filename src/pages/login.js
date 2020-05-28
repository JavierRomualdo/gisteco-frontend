import React from 'react';
import { withRouter } from 'react-router-dom';
import FormularioLogin from '../modules/global/components/FormularioLogin';
import ApolloProviderConHooks from '../modules/global/components/ApolloProviderConHooks';

const FormularioLoginConRouter = withRouter(FormularioLogin);

const Login = () => {
    return (
        <ApolloProviderConHooks>
            <FormularioLoginConRouter />
        </ApolloProviderConHooks>
    );
}

export default Login;