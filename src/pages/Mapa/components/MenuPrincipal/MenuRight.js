import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import user from '../../../../../assets/img/user.png';
import Alert, { TIPO_ALERTA } from '../../../../../lib/alerts';
import { SignOutIcon, LoadingIconChange, UnlockAltIcon } from '../../../../../lib/icons';
import { TAG_CERRAR_SESION, MSJ_ERROR_DATOS_USUARIO, TAG_CAMBIAR_CONTRASENA } from '../values';
import { DATOS_USUARIO } from '../queries';
import auth from '../../../../../lib/auth';
import messages from '../../../../../lib/messages/messages';
import TareasClass from '../../Tareas/Tareas.class';
import { CAMBIAR_CONTRASENA } from '../../Tareas/mapper';

const MenuLeft = (props) => {
    const {loading,error,data} = useQuery(DATOS_USUARIO,{fetchPolicy: "network-only"});
	if (loading) return <div className="text-center text-white"><LoadingIconChange tamanio="fa-xs" color="text-white"/></div>;
	if (error) return <Alert tipo={TIPO_ALERTA.ADVERTENCIA}>{MSJ_ERROR_DATOS_USUARIO}: {error.message}</Alert>;
    const {nombre_completo, dependencia} = data.sistema.datosUsuarioSistema;

    function handleAbrirCambiarContrasena(e) {
        TareasClass.api.abrirTarea({ componenteId: CAMBIAR_CONTRASENA, reload: true })
    }

    function handleCerrarSesion(e) {
        auth.logout()
        .then(onlogout => {
            if (onlogout) props.history.push("/login");
        })
        .catch(error => {
            messages.growl.show({ severity: 'error', detail: `Error al cerrar sesión: ${error.message}` });
        });
    }

    return (
        <ul className="navbar-nav flex-row ml-md-mr-auto  d-md-flex">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white hvr-underline-reveal py-0" href="#" id="navUser" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className='navbar-brand m-0 rounded-circle' src={user} alt="..." width="25" />
                </a>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navUser">
                    <li className="nav-item dropdown">
                        <div className="user-name"><strong>{nombre_completo}</strong></div>
                        <div className="user-name py-0">{dependencia}</div>
                    </li>
                    <li className="dropdown-divider"></li>
                        <button className="dropdown-item" onClick={handleAbrirCambiarContrasena}>
                            <UnlockAltIcon/> 
                            <span> {TAG_CAMBIAR_CONTRASENA} </span>
                        </button>
                    <li className="nav-item dropdown">
                        <button className="dropdown-item" onClick={handleCerrarSesion}>
                            <SignOutIcon/> 
                            <span> {TAG_CERRAR_SESION} </span>
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default MenuLeft;