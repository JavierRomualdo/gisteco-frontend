import React from 'react';
import { Query } from 'react-apollo';
import NavbarMenu from './NavbarMenu';
import { LoadingIconChange } from '../../../../lib/icons';
import Alert from '../../../../lib/alerts'
import { MENU_PRINCIPAL } from '../../graphql/queries';

export default () => {
    return (
        <Query
            query={MENU_PRINCIPAL}
            variables={{ todos: false }}
        >
            {({ data, loading, error }) => {
                if (loading) return <div className="text-center text-white"><LoadingIconChange tamanio="fa-xs" color="text-white" /></div>;
                if (error) return <Alert tipo={"danger"}>Error mientras se cargaba el menú!</Alert>;
                return <NavbarMenu menus={data.sistema.menuPrincipal} />
            }}
        </Query>
    );
}