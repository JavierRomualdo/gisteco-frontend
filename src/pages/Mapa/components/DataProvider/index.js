import React from 'react';
import { APP_MAIN_DATA } from '../../graphql/queries'
import { Query } from 'react-apollo';

export default ({ children }) => {
    return (
        <Query
            query={APP_MAIN_DATA}
            variables={{ todos: false }}
        >
            {({ data, loading, error }) => {

                if (loading) return 'Cargando información...';
                if (error) return `Error: ${error.message}`;
                return children(data);
            }}
        </Query>
    )
}