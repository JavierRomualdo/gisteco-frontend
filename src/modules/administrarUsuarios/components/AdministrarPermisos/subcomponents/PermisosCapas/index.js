import React from 'react';
import ListaPermisosCapas from './PermisosCapas';
import { CAPAS_PERMISOS } from './queries';
import { useQuery } from 'react-apollo-hooks';
import Alert, { TIPO_ALERTA } from '../../../../../../lib/alerts';
import { LoadingIcon } from '../../../../../../lib/icons';
import { MSJ_ERROR_CAPAS_PERMISOS } from './values';

const PermisosCapas = ({disabled, listaCheckeados, datosCapasAsignadasMenu, usuario, setLoading, setListaOperaciones, setDatosOperacionesAsignadasCapa}) => {
    const {loading,error,data} = useQuery(CAPAS_PERMISOS,{fetchPolicy: "network-only", variables: { todos: true }})
	if (loading) return <div className="text-center text-white"><LoadingIcon/></div>;
    if (error) return <Alert tipo={TIPO_ALERTA.ADVERTENCIA}>{MSJ_ERROR_CAPAS_PERMISOS}: {error.message}</Alert>;

    return (
        <ListaPermisosCapas listaMenu={data.sistema.arbolCapas} listaCheckeados={listaCheckeados} datosCapasAsignadasMenu={datosCapasAsignadasMenu}
            disabled={disabled} usuario={usuario} setLoading={setLoading} setListaOperaciones={setListaOperaciones}
            setDatosOperacionesAsignadasCapa={setDatosOperacionesAsignadasCapa}/>
    );
}

export default PermisosCapas;