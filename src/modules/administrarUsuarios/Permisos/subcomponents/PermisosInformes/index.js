import React from 'react';
import { Query } from 'react-apollo';
import CheckboxTree from '../CheckboxTree';
import { INFORMES_CAPAS } from './queries';

export default ({ capas, ...props }) => {
    return (
        <Query
            query={INFORMES_CAPAS}
            variables={{ capas }}
        >
            {({ data, loading, error }) => {
                if (loading) return 'Cargando...';
                if (error) return `${error.message}`;

                return (
                    <CheckboxTree
                        nodes={data.permisos.informesCapas}
                        {...props}
                    />
                );
            }}
        </Query>
    )
}