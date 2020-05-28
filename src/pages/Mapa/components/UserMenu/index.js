import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import user from './user.png';
import { LoadingIconChange, UnlockAltIcon, SignOutIcon } from '../../../../lib/icons';
import { CAMBIAR_CONTRASENA } from '../../store/tareas/mapper';
import { withStore } from '../../store/Store';
import auth from '../../../../lib/auth';
import { DATOS_USUARIO } from './queries';
import Alert, { TIPO_ALERTA } from '../../../../lib/alerts';
import Swal from 'sweetalert2';

const TAG_CERRAR_SESION = 'Cerrar sesión';
const TAG_CAMBIAR_CONTRASENA = 'Cambiar contraseña';
const MSJ_ERROR_DATOS_USUARIO = 'Error datos del usuario';

const MenuLeft = ({ storeContext: { tareasApi } }) => {
    const { loading, error, data } = useQuery(DATOS_USUARIO, { fetchPolicy: "network-only" });
    if (loading) return <div className="text-center text-white"><LoadingIconChange tamanio="fa-xs" color="text-white" /></div>;
    if (error) return <Alert tipo={TIPO_ALERTA.ADVERTENCIA}>{MSJ_ERROR_DATOS_USUARIO}: {error.message}</Alert>;
    const { nombre_completo, dependencia } = data.sistema.datosUsuarioSistema;

    function handleAbrirCambiarContrasena(e) {
        tareasApi.abrirTarea({ componenteId: CAMBIAR_CONTRASENA, reload: true })
    }

    function handleCerrarSesion(e) {
        auth.logout()
            .then(onlogout => {
                if (onlogout) window.location.reload();
            })
            .catch(() => {
                Swal.fire('¡Error!', 'Algo ocurrió cuando se cerraba sesión.', 'error');
            });
    }

    return (
        <ul id="userMenuWdgt" className="navbar-nav flex-row ml-md-mr-auto  d-md-flex">
            <li className="nav-item dropdown">
                <span className="cursor-pointer nav-link dropdown-toggle text-white hvr-underline-reveal py-0" id="navUser" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img className='navbar-brand m-0 rounded-circle' src={user} alt="..." width="25" />
                </span>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="navUser">
                    <li className="nav-item dropdown">
                        <div className="user-name"><strong>{nombre_completo}</strong></div>
                        <div className="user-name py-0">{dependencia}</div>
                    </li>
                    <li className="dropdown-divider"></li>
                    <button className="dropdown-item" onClick={handleAbrirCambiarContrasena}>
                        <UnlockAltIcon />
                        <span> {TAG_CAMBIAR_CONTRASENA} </span>
                    </button>
                    <li className="nav-item dropdown">
                        <button className="dropdown-item" onClick={handleCerrarSesion}>
                            <SignOutIcon />
                            <span> {TAG_CERRAR_SESION} </span>
                        </button>
                    </li>
                </ul>
            </li>
        </ul>
    );
}

export default withStore(MenuLeft);