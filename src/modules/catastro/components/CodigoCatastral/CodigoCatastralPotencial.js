import React from 'react';
import { Query } from 'react-apollo';
import { OBTENER_CODIGO_CATASTRAL_USUARIO_POTENCIAL } from './queries';

export default ({ gid }) => {
    return (
        <Query
            query={OBTENER_CODIGO_CATASTRAL_USUARIO_POTENCIAL}
            variables={{ gid }}
            fetchPolicy="network-only"
        >
            {({ data, loading, error }) => {
                if (loading) return `Cargando...`;
                if (error) return error.message;

                return (
                    <div>
                        <span className='ml-2'>{data.catastro.codCatastral}</span>
                    </div>
                )
            }}
        </Query>
    );
}