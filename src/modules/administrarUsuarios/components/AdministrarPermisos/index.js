import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { MENU_PRINCIPAL_PERMISOS } from './queries';
import { MSJ_ERROR_MENU_PERMISOS } from './values';
import { LoadingIcon } from '../../../../lib/icons';
import Alert, { TIPO_ALERTA } from '../../../../lib/alerts';
import ListaPermisos from './ListaPermisos';

const AdministrarPermisos = () => {
    const {loading,error,data} = useQuery(MENU_PRINCIPAL_PERMISOS,{fetchPolicy: "network-only", variables: { todos: true }})
	if (loading) return <div className="text-center text-white"><LoadingIcon/></div>;
	if (error) return <Alert tipo={TIPO_ALERTA.ADVERTENCIA}>{MSJ_ERROR_MENU_PERMISOS}: {error.message}</Alert>;

	return (
		<ListaPermisos listaMenu={data.sistema.listaMenu}/>
	);
}
export default AdministrarPermisos;