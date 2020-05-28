import React from 'react';
import { Query } from 'react-apollo';
import Alert, { TIPO_ALERTA } from '../../../../../lib/alerts';
import { LoadingIcon } from '../../../../../lib/icons';
import Dashboard from './Dashboard';
import { DICCIONARIO_CAPA } from '../queries';

export default ({ feature: ft }) => {

    const capa = ft.get('capa'),
        idCapa = parseInt(capa.get('id'));

    return (
        <Query
            query={DICCIONARIO_CAPA}
            variables={{ idCapa }}
        >
            {({ loading, error, data }) => {
                if (loading) return <div className="text-center"><LoadingIcon /></div>;
                if (error) return <Alert tipo={TIPO_ALERTA.INFORMACION}>{error.message}</Alert>;

                return <Dashboard
                    capa={capa}
                    propiedades={ft.getProperties()}
                    diccionario={data.sistema.diccionarioCapa}
                />;
            }}
        </Query>
    )
};