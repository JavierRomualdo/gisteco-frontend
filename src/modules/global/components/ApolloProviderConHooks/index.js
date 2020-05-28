import React from 'react';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import client from '../../../../pages/Mapa/apollo/client';

const ApolloProviderConHooks = ({ children }) => (
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            {children}
        </ApolloHooksProvider>
    </ApolloProvider>
);
export default ApolloProviderConHooks;