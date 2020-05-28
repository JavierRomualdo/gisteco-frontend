import React from 'react';
import { Query } from 'react-apollo';
import { ARBOL_PERMISOS_CAPAS } from './queries';
import CheckboxTree from '../CheckboxTree';
import { filterEmptyGroups } from './util';

export default (props) => {
    return (
        <Query
            query={ARBOL_PERMISOS_CAPAS}
            variables={{ todos: true }}

        >
            {({ data, loading, error }) => {
                if (loading) return 'Cargando...';
                if (error) return `${error.message}`;

                return (
                    <CheckboxTree
                        nodes={filterEmptyGroups(data.permisos.arbolCapas)}
                        {...props}
                    />
                );
            }}
        </Query>
    )
}