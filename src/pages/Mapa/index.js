import React from 'react';
import DataProvider from './components/DataProvider';
import ApolloProviderConHooks from '../../modules/global/components/ApolloProviderConHooks';
import App from './App';

export default () => {
    return (
        <ApolloProviderConHooks>
            <DataProvider>
                {(appData) => {
                    return (
                        <App appData={appData} />
                    )
                }}
            </DataProvider>
        </ApolloProviderConHooks>
    );
}