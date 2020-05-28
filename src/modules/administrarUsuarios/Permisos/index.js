import React, { useState, useEffect, useCallback } from 'react';
import PermisosMenu from './subcomponents/PermisosMenu';
import PermisosCapas from './subcomponents/PermisosCapas';
import { TabView, TabPanel } from 'primereact/tabview';
import AutoCompleteUsuarios from '../../global/components/AutoCompleteUsuarios';
import {
    getOpcionesAutorizadas,
    getCapasAutorizadas,
    concederPermisoACapas,
    concederPermisoMenus,
    quitarPermisoACapas,
    quitarPermisoMenus,
    getInformesCapasAutorizados,
    quitarPermisoAInformesCapas,
    concederPermisoAInformesCapas
} from './util';
import { useApolloClient } from 'react-apollo-hooks';
import classnames from 'classnames';
import PermisosInformes from './subcomponents/PermisosInformes';

const initialState = {
    menuChecked: [],
    capasChecked: [],
    informesChecked: []
};

const mensajeInicial = {
    texto: 'Elija un usuario',
    className: 'text-danger'
};

const actualizandoPermisosMsj = {
    texto: 'Actualizando permisos...',
    className: 'text-info'
};

const permisosActualizadosMsj = {
    texto: '¡Permisos actualizados!',
    className: 'text-success'
};

export default () => {

    const [usuario, setUsuario] = useState(null);
    const [checked, setChecked] = useState(initialState);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const apollo = useApolloClient();

    const actualizarMenuAutorizado = useCallback(function () {
        const idUsuario = usuario.id;
        return getOpcionesAutorizadas(apollo, { idUsuario })
            .then(menuChecked => setChecked(prev => ({ ...prev, menuChecked })));
    }, [usuario, apollo])

    const actualizarCapasAutorizadas = useCallback(function () {
        const idUsuario = usuario.id;
        return getCapasAutorizadas(apollo, { idUsuario })
            .then(capasChecked => setChecked(prev => ({ ...prev, capasChecked })))
    }, [usuario, apollo]);

    const actualizarInformesCapasAutorizados = useCallback(function () {
        const idUsuario = usuario.id;
        return getInformesCapasAutorizados(apollo, { idUsuario })
            .then(informesChecked => setChecked(prev => ({ ...prev, informesChecked })))
    }, [usuario, apollo]);

    useEffect(() => {
        if (usuario) {
            setMensaje({ texto: 'Cargando permisos del usuario ...', className: 'text-info' })
            Promise.all([
                actualizarMenuAutorizado(),
                actualizarCapasAutorizadas(),
                actualizarInformesCapasAutorizados()
            ])
                .then(() => {
                    setMensaje({ texto: '¡Permisos cargados!', className: 'text-success' });
                })
                .catch(error => setMensaje({ texto: error.message, className: 'text-danger' }));
        } else {
            setChecked(initialState);
            setMensaje(mensajeInicial);
        }
    }, [usuario, actualizarCapasAutorizadas, actualizarInformesCapasAutorizados, actualizarMenuAutorizado]);

    function concederPermiso(setName, values) {
        const idUsuario = usuario.id;
        setMensaje(actualizandoPermisosMsj);
        if (setName === 'menuChecked') {
            concederPermisoMenus(apollo, { idUsuario, opcionesMenu: values })
                .then(() => Promise.all([
                    actualizarMenuAutorizado(),
                    actualizarCapasAutorizadas()
                ]))
                .then(() => setMensaje(permisosActualizadosMsj))
                .catch((error) => setMensaje({ texto: error.message, className: 'text-danger' }));
        } else if (setName === 'capasChecked') {
            concederPermisoACapas(apollo, { idUsuario, capas: values })
                .then(() => Promise.all([
                    actualizarCapasAutorizadas(),
                    actualizarInformesCapasAutorizados()
                ]))
                .then(() => setMensaje(permisosActualizadosMsj))
                .catch((error) => setMensaje({ texto: error.message, className: 'text-danger' }));
        } else if (setName === 'informesChecked') {
            concederPermisoAInformesCapas(apollo, { idUsuario, informes: values })
                .then(() => actualizarInformesCapasAutorizados())
                .then(() => setMensaje(permisosActualizadosMsj))
                .catch((error) => setMensaje({ texto: error.message, className: 'text-danger' }));
        }
    }

    function quitarPermiso(setName, values) {
        const idUsuario = usuario.id;
        setMensaje(actualizandoPermisosMsj);
        if (setName === 'menuChecked') {
            quitarPermisoMenus(apollo, { idUsuario, opcionesMenu: values })
                .then(() => Promise.all([
                    actualizarMenuAutorizado(),
                    actualizarCapasAutorizadas()
                ]))
                .then(() => setMensaje(permisosActualizadosMsj))
                .catch((error) => setMensaje({ texto: error.message, className: 'text-danger' }));
        } else if (setName === 'capasChecked') {
            quitarPermisoACapas(apollo, { idUsuario, capas: values })
                .then(() => Promise.all([
                    actualizarCapasAutorizadas(),
                    actualizarInformesCapasAutorizados()
                ]))
                .then(() => setMensaje(permisosActualizadosMsj))
                .catch((error) => setMensaje({ texto: error.message, className: 'text-danger' }));
        } else if (setName === 'informesChecked') {
            quitarPermisoAInformesCapas(apollo, { idUsuario, informes: values })
                .then(() => actualizarInformesCapasAutorizados())
                .then(() => setMensaje(permisosActualizadosMsj))
                .catch((error) => setMensaje({ texto: error.message, className: 'text-danger' }));
        }
    }

    function handleCheck(setName, _checked, target) {
        if (target.isLeaf) {
            if (target.checked) {
                concederPermiso(setName, [target.value]);
            } else {
                quitarPermiso(setName, [target.value]);
            }
        } else {
            const conceder = _checked.filter(c => checked[setName].indexOf(c) === -1),
                quitar = checked[setName].filter(c => _checked.indexOf(c) === -1);
            if (conceder.length) {
                concederPermiso(setName, conceder);
            } else if (quitar.length) {
                quitarPermiso(setName, quitar);
            }
        }
    }

    const { menuChecked, capasChecked, informesChecked } = checked;

    return (
        <div className='p-2'>
            <div className="form">
                <div className="form-group mb-2">
                    <label className='font-weight-bold'>Usuario</label>
                    <AutoCompleteUsuarios
                        autoFocus={true}
                        inputId="inputUsuariosPermiso"
                        onChange={() => {
                            setUsuario(null);
                        }}
                        onSelect={e => {
                            setUsuario(e.value)
                        }}
                    />
                </div>
            </div>
            <p className={classnames('font-weight-bold mb-2', mensaje.className)}>{mensaje.texto}</p>
            <TabView className='p-0' renderActiveOnly={false}>
                <TabPanel header="Menú">
                    <PermisosMenu
                        disabled={!usuario}
                        checked={menuChecked}
                        onCheck={handleCheck.bind(null, 'menuChecked')}
                    />
                </TabPanel>
                <TabPanel header="Capas">
                    <PermisosCapas
                        disabled={!usuario}
                        checked={capasChecked}
                        onCheck={handleCheck.bind(null, 'capasChecked')}
                    />
                </TabPanel>
                <TabPanel header="Informes de capas">
                    <PermisosInformes
                        disabled={!usuario}
                        capas={capasChecked}
                        checked={informesChecked}
                        onCheck={handleCheck.bind(null, 'informesChecked')}
                    />
                </TabPanel>
            </TabView>
        </div>
    );
}