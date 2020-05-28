import React, { useState, useEffect } from 'react';
import TabComponentContainer from '../../../../../global/components/TabComponentContainer';
import SearchFiltrar from '../../../../../global/components/SearchFilter';
import CheckboxTreeModel from '../../../../../global/components/CheckboxTreeModel';
import { MinusIcon } from '../../../../../../lib/icons';
import { useApolloClient } from 'react-apollo-hooks';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../lib/alerts';
import { LISTA_CAPAS_ASIGNADAS_MENU, LISTA_OPERACIONES_MENU } from './queries';
import { REGISTRAR_ELIMINAR_OPERACION_USUARIO } from '../PermisosOperaciones/mutations';
import { REGISTRAR_ELIMINAR_PERMISO_USUARIO_MENU } from './mutations';

const PermisosMenus = ({listaMenu, listaCheckeados, usuario, disabled, setLoading, setDatosCapasAsignadasMenu}) => {
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros menus
    const [menus, _] = useState(listaMenu);
    const [menusFiltered, setMenusFiltered] = useState(listaMenu);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState(["1"]);
    const [filterText, setFilterText] = useState('');
    const client = useApolloClient();

    useEffect(() => {
        setChecked(listaCheckeados.map((item) => item.value ));
        if (mensaje.tipo) setMensaje(mensajeInicial);
    }, [listaCheckeados]);

    function handleInputChange(e) {
        const value = e.target.value;
        setFilterText(value);
        filterTree(value);
    }

    function filterTree(filter) {
        if (!filter) {
            setMenusFiltered(menus);
        } else {
            setMenusFiltered(menus.reduce((filtered, node) => filterNodes(filtered, node, filter), []));
        }
    }

    function filterNodes(filtered, node, filter) {
        const children = (node.children || []).reduce((filtered, node) => filterNodes(filtered, node, filter), []);

        if (
            // Node's label matches the search string
            node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
            // Or a children has a matching node
            children.length
        ) {
            filtered.push({ ...node, children });
        }

        return filtered;
    }

    function onCheck(listaChecked, targetNode) {
        const listaPromesas = [];
        if (!targetNode.children) {
            const promesa = registrarPermiso(targetNode, listaChecked);
            promesa && listaPromesas.push(promesa);
        } else {
            targetNode.children.map(item => {
                const promesa = registrarPermiso({value: item.value, checked:  targetNode.checked }, listaChecked);
                promesa && listaPromesas.push(promesa);
            });
        }
        enviarCapasAsignadasAlMenu(targetNode.checked, listaPromesas);
    }

    function enviarCapasAsignadasAlMenu(checkeado, listaPromesas) {
        Promise.all(listaPromesas).then(resultados => {
            let listaCapasAsignadasMenu = [];
            resultados.forEach(capas => {
                capas.forEach(capa => {
                    const micapa = listaCapasAsignadasMenu.find(item => item && item.id === capa.id);
                    if (!micapa) {
                        listaCapasAsignadasMenu.push(capa);
                    }
                });
            });
            setDatosCapasAsignadasMenu({checkeado, listaCapasAsignadasMenu});
        }, reasen => {
            setMensaje({ texto: `Error: ${reasen}`, tipo: TIPO_ALERTA.ERROR })
        });
    }

    function registrarPermiso(targetNode, listaChecked) {
        const { value, checked } = targetNode;
        if (!verificarCheckeado(value, checked)) {
            setLoading(true);
            setMensaje(mensajeInicial);
            const idUsuarioSistema = parseInt(usuario.id);
            const idMenu = parseInt(value);
            return client.mutate({
                mutation: REGISTRAR_ELIMINAR_PERMISO_USUARIO_MENU,
                variables: { idUsuarioSistema, idMenu, checked }
            }).then((data) => {
                const { registrarEliminarPermisoUsuarioMenu } = data.data.sistema;
                if (registrarEliminarPermisoUsuarioMenu) {
                    setChecked(listaChecked);
                    // si el checked (listo las capas para poder ingresar) caso contrario elimino esas capas
                    // if (checked) listarCapasAsignadasMenu(idMenu, checked);
                    // 1. registro las operaciones
                    listarOperacionesDelMenu(idMenu, checked);
                    // 2. listo las capas
                    if (checked) return listarCapasAsignadasMenu(idMenu);
                    return [];
                }
            }).catch((error) => setMensaje({ texto: `Error: ${error.message}`, tipo: TIPO_ALERTA.ERROR }) )
            .finally(() => setLoading(false) );
        }
    }

    function listarOperacionesDelMenu(idMenu, checked) {
        setLoading(true);
        setMensaje(mensajeInicial);
        return client.query({
            query: LISTA_OPERACIONES_MENU,
            variables: { idMenu },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listaOperacionesMenu } = data.sistema;
            if (listaOperacionesMenu.length > 0) {
                listaOperacionesMenu.forEach(operacion => {
                    registrarEliminarOperacionUsuario(parseInt(operacion.id), checked);
                });
            }
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        })
        .finally(() => setLoading(false) );
    }

    function registrarEliminarOperacionUsuario(idOperacion, checked) {
        setLoading(true);
        setMensaje(mensajeInicial);
        const idUsuarioSistema = parseInt(usuario.id);
        client.mutate({
            mutation: REGISTRAR_ELIMINAR_OPERACION_USUARIO,
            variables: { idUsuarioSistema, idOperacion, checked }
        }).then((data) => {
            const { registrarEliminarOperacionesUsuarioCapa } = data.data.sistema;
            if (registrarEliminarOperacionesUsuarioCapa) {
                if (checked) {
                    console.log(`La operacion ${idOperacion} se ha ingresado correctamente.`);
                } else {
                    console.log(`La operacion ${idOperacion} se ha eliminado correctamente.`);
                }
            }
        }).catch((error) => setMensaje({ texto: `Error: ${error.message}`, tipo: TIPO_ALERTA.ERROR }) )
        .finally(() => setLoading(false) );
    }

    function listarCapasAsignadasMenu(idMenu) {
        setLoading(true);
        setMensaje(mensajeInicial);
        return client.query({
            query: LISTA_CAPAS_ASIGNADAS_MENU,
            variables: { idMenu },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listaCapasAsignadasMenu } = data.sistema;
            return listaCapasAsignadasMenu;
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        })
        .finally(() => setLoading(false) );
    }



    function verificarCheckeado(value, checkeado) {
        if (checkeado) {
            const item = checked.find(item => item === value);
            return item;
        } else {
            return checkeado;
        }
    }

    function onExpand(expanded) {
        setExpanded(expanded);
    }

    return (
        <TabComponentContainer>
            <SearchFiltrar filtroGlobal={filterText} onChangeFiltro={handleInputChange} isLargo={true}/>
            <CheckboxTreeModel nodes={menusFiltered} checked={checked} expanded={expanded}
                icons={{
                    check: <i className="far fa-check-square"></i>,
                    uncheck: <i className="far fa-square"></i>,
                    halfCheck: <i className="far fa-check-square text-muted"></i>,
                    expandClose: <i className="fas fa-angle-right text-muted"></i>,
                    expandOpen: <MinusIcon />,
                    expandAll: <i className="fas fa-plus-square"></i>,
                    collapseAll: <i className="fas fa-minus-square"></i>,
                    parentClose: <i className="far fa-folder"></i>,
                    parentOpen: <i className="far fa-folder-open"></i>,
                    leaf: <i className="far fa-clipboard"></i>
                }}
                disabled={disabled}
                showExpandAll
                onCheck={onCheck}
                onExpand={onExpand}
            />
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
        </TabComponentContainer>
    );
}

export default PermisosMenus;