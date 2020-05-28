import React from 'react';
import { Query } from 'react-apollo';
import { OBTENER_CODIGO_CATASTRAL } from './queries';

export default ({ suministro }) => {
    return (
        <Query
            query={OBTENER_CODIGO_CATASTRAL}
            variables={{ suministro }}
            fetchPolicy="network-only"
        >
            {({ data, loading, error }) => {
                if (loading) return `Cargando...`;
                if (error) return error.message;

                return (
                    <div>
                        <label className="font-weight-bold d-block">Según sisgeco:</label>
                        <span className='ml-2'>{data.catastro.codSisgeco}</span>
                        <label className="font-weight-bold d-block">Según gisteco:</label>
                        <span className='ml-2'>{data.catastro.codGisteco}</span>
                    </div>
                )
            }}
        </Query>
    );
}