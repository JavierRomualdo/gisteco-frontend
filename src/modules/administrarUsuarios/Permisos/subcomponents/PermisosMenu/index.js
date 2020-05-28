import React from 'react';
import { ARBOL_PERMISOS_MENU_PRINCIPAL } from './queries';
import { Query } from 'react-apollo';
import CheckboxTree from '../CheckboxTree';

export default (props) => {
    return (
        <Query
            query={ARBOL_PERMISOS_MENU_PRINCIPAL}
            variables={{ todos: true }}
        >
            {({ data, loading, error }) => {
                if (loading) return 'Cargando...';
                if (error) return `${error.message}`;

                return (
                    <CheckboxTree
                        nodes={data.permisos.menuPrincipal}
                        {...props}
                    />
                );
            }}
        </Query>
    );
}