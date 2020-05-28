import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import TabComponentContainer from '../../../../../global/components/TabComponentContainer';
import SearchFiltrar from '../../../../../global/components/SearchFilter';
import CheckboxTreeModel from '../../../../../global/components/CheckboxTreeModel';
import { MinusIcon } from '../../../../../../lib/icons';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../lib/alerts';
import { useApolloClient } from 'react-apollo-hooks';
import { REGISTRAR_ELIMINAR_PERMISO_USUARIO_CAPA, VERIFICAR_CAPA_DEL_MENU_PERMISO } from './mutations';
import { LISTA_OPERACIONES_CAPA } from '../PermisosMenus/queries';
import { CAPAS_PERMISOS } from './queries';
import { REGISTRAR_ELIMINAR_OPERACION_USUARIO } from '../PermisosOperaciones/mutations';
import { LISTAR_PERMISOS_OPERACIONES_CAPA } from '../../queries';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
        { 
            value: 'deimos',
            label: 'Deimos',
            children: [
                { value: 'phobos', label: 'Phobos' },
                { value: 'phobos', label: 'Phobos' },
            ]
        },
    ],
}];

const ListaPermisosCapas = ({listaCheckeados, datosCapasAsignadasMenu, disabled, usuario, setLoading, listaOperaciones, 
    setListaOperaciones, listaCheckeadosOperacionesCapas, setListaCheckeadosOperacionesCapas}) => {
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // parametros capas
    const [capas, setCapas] = useState([]);
    const [capasFiltered, setCapasFiltered] = useState([]);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [filterText, setFilterText] = useState('');
    const client = useApolloClient();
    
    useEffect(() => {
        client.query({
            query: CAPAS_PERMISOS,
            variables: { todos: true },
            fetchPolicy: "network-only"
        }).then(({data})=>{
            const { arbolCapas } = data.sistema;
            setCapas(arbolCapas);
            setCapasFiltered(arbolCapas);
        });
    }, []);

    useEffect(() => {
        setChecked(listaCheckeados.map((item) => item.label ));
        console.log('++++++++++ listaCheckeados: ', listaCheckeados);
        // aca listo las operaciones de las capas !!!
        if (listaCheckeados.length > 0) {
            const listaPromesas = [];
            listaCheckeados.forEach(item => {
                const promesa = listarOperacionesDelCapa({id: item.value}, true, {__typename: "Capa", id: item.value, label: item.label, value: item.label}); // parent, checkeado, item
                if (promesa !==null) {
                    console.log('promesa: ', promesa);
                    listaPromesas.push(promesa);
                }
            });
            // enviarOperacionesAsignadasAlCapa(true, targetNode.parent, listaPromesas);
            generarCapaDeOperaciones(listaPromesas);
        }
        if (mensaje.tipo) setMensaje(mensajeInicial);
    }, [listaCheckeados]);

    function generarCapaDeOperaciones(listaPromesas) {
        let capaOperaciones = [];
        Promise.all(listaPromesas).then(resultados => {
            console.log('****resultados operaciones: ', resultados);
            console.log('****capa de capas: ', capas);
            resultados.forEach(capa => {
                if (capa) {
                    if (capaOperaciones.length > 0) {
                        let nodoPrincipal = buscarSuNodoPrincipal(capa);
                        console.log('+++capaOperaciones: ', capaOperaciones);
                        console.log('+++nodoPrincipal: ', nodoPrincipal);
                        const nodoop = capaOperaciones.find(op => op.id === nodoPrincipal.id);
                        if (nodoop) {
                            nodoop.children.push(capa);
                        } else {
                            // let nodoPrincipal = buscarSuNodoPrincipal(capa);
                            nodoPrincipal.children = [];
                            console.log('****nodo principal: ', nodoPrincipal);
                            nodoPrincipal.children.push(capa);
                            capaOperaciones.push(nodoPrincipal);
                        }
                    } else {
                        let nodoPrincipal = buscarSuNodoPrincipal(capa);
                        nodoPrincipal.children = [];
                        console.log('****nodo principal: ', nodoPrincipal);
                        nodoPrincipal.children.push(capa);
                        capaOperaciones.push(nodoPrincipal);
                    }
                    // console.log('**----- capaOperaciones', capaOperaciones);
                    // setListaOperaciones(capaOperaciones);
                }
            });
            console.log('**----- capaOperaciones', capaOperaciones);
            setListaOperaciones(capaOperaciones);
        }, reasen => {
            setMensaje({ texto: `Error: ${reasen}`, tipo: TIPO_ALERTA.ERROR })
        });
    }

    function buscarSuNodoPrincipal(capa) {
        let nodoPrincipal = null;
        capas.forEach(nodo => {
            const capaExiste = nodo.children.find(cp => cp.id === capa.id);
            if (capaExiste) nodoPrincipal = nodo;
        });
        return {...nodoPrincipal};
    }

    useEffect(() => {
        const { checkeado, listaCapasAsignadasMenu } = datosCapasAsignadasMenu;
        // verificar si la listaCapasAsignadasMenu esten checkeados
        // si no estan checkeados se registrar como permisocapa
        let listaCheckeados = [...checked];
        console.log('datosCapasAsignadasMenu: ', datosCapasAsignadasMenu);
        const listaPromesas = [];
        let dataParent = {};
        listaCapasAsignadasMenu.forEach(capa => {
            // encontrar si "capa" este checkeado e la lista de checkeados del tab capas
            let capaChecked = listaCheckeados.find(item => item === capa.nombre);

            if (!capaChecked && checkeado) { // se ha checkeado (true) - se agrega esta capa
                listaCheckeados.push(capa.nombre);
                // registrarPermiso(infoNode, grupoCapaSeleccionado, item, listaChecked, isOrigenMenu);
                // const grupoCapaSeleccionado = capas.find(capa => capa.label);
                
                // hay que encontrar el nodoGrupoCapaSeleccionado
                let grupoCapaSeleccionado = {};
                capas.forEach(grupocapa => {
                    const nodo = grupocapa.children.find(cp => cp.id === capa.id);
                    if (nodo) {
                        grupoCapaSeleccionado = grupocapa;
                    }
                });
                console.log('.-.---capas: ', capas);
                console.log('..-.. capa: ', capa);
                console.log('.-.-.-grupoCapaSeleccionado: ', grupoCapaSeleccionado);
                dataParent = {
                    __typename: "GrupoCapa",
                    id: grupoCapaSeleccionado.id,
                    label: grupoCapaSeleccionado.label,
                    value: grupoCapaSeleccionado.value
                };
                const item = {
                    __typename: capa.__typename,
                    id: capa.id,
                    value: capa.nombre,
                    label: capa.nombre
                };
                const promesa = registrarPermiso({idCapa: capa.id, value: capa.nombre, checkeado}, grupoCapaSeleccionado, item, listaCheckeados, true);
                promesa && listaPromesas.push(promesa);
                // registrarPermiso({idCapa: capa.id, value: capa.nombre, checkeado }, listaCheckeados, true);
            } else if (!checkeado) { // se elimina esta capa
                const lista = listaCheckeados.filter(item => { if (item !== capa.nombre) return item;});
                const grupoCapaSeleccionado = {};
                capas.forEach(grupocapa => {
                    grupoCapaSeleccionado = grupocapa.children.find(capa => capa.value === capaChecked.value);
                });
                const item = {
                    __typename: capaChecked.__typename,
                    id: capaChecked.id,
                    value: capaChecked.nombre,
                    label: capaChecked.nombre
                };
                const promesa = registrarPermiso({idCapa: capa.id, value: capa.nombre, checkeado}, grupoCapaSeleccionado, item, lista, true);
                promesa && listaPromesas.push(promesa);
                // registrarPermiso({idCapa: capa.id, value: capa.nombre, checkeado }, lista, true);
            }
            enviarOperacionesAsignadasAlCapa(checkeado, dataParent, listaPromesas);
        });
    }, [datosCapasAsignadasMenu.listaCapasAsignadasMenu]);
    //
    function handleInputChange(e) {
        const value = e.target.value;
        setFilterText(value);
        filterTree(value);
    }

    function filterTree(filter) {
        if (!filter) {
            setCapasFiltered(capas);
        } else {
            setCapasFiltered(capas.reduce((filtered, node) => filterNodes(filtered, node, filter), []));
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
    //

    function onCheck(listaChecked, targetNode) {
        let listaPromesas = [];
        let dataParent = {};
        if (!targetNode.children) {
            let item = targetNode.parent.children[targetNode.index];
            dataParent = targetNode.parent;
            console.log('dataParent: ', dataParent);
            console.log('capas: ', capas);
            console.log('item: ', item);
            let grupoCapaSeleccionado = capas.find(capa => capa.label === dataParent.label);
            console.log('grupoCapaSeleccionado: ', grupoCapaSeleccionado);
            // listarOperacionesDelCapa(targetNode.parent, targetNode.checked, item);
            const promesa = registrarPermiso({idCapa: item.id, value: targetNode.value, checkeado: targetNode.checked}, grupoCapaSeleccionado, item, listaChecked, false);
            promesa && listaPromesas.push(promesa);
        } else {
            // const { __typename, id, label, value } = targetNode;
            const grupoCapaSeleccionado = capas.find(capa => capa.label === targetNode.label);
            dataParent = {
                __typename: "GrupoCapa",
                id: grupoCapaSeleccionado.id,
                label: targetNode.label,
                value: targetNode.value
            };
            targetNode.children.map(item => {
                // listarOperacionesDelCapa(targetNode.parent, targetNode.checked, item);
                const promesa = registrarPermiso({idCapa: item.id, value: item.value, checkeado: targetNode.checked }, grupoCapaSeleccionado, item, listaChecked, false);
                promesa && listaPromesas.push(promesa);
            });
        }
        enviarOperacionesAsignadasAlCapa(targetNode.checked, dataParent, listaPromesas);
    }

    function enviarOperacionesAsignadasAlCapa(checkeado, parent, listaPromesas) {
        Promise.all(listaPromesas).then(resultados => {
            let nuevasOperaciones = cloneDeep(listaOperaciones);
            console.log('resultados: ', resultados);
            console.log('parent: ', parent);
            const { __typename, id, label, value } = parent;
            let nodoSeleccionado = nuevasOperaciones.find(nodo => nodo.id === id); // (nodo padre de operaciones)
            
            if (nodoSeleccionado) {
                // si esta el nodo entonces alli se agregan los hijos
                if (checkeado) {
                    // se agrega las operaciones
                    resultados.forEach(resultado => { // resultado (la capa con sus operaciones dentro)
                        if (resultado) {
                            // hay que verificar si la capa esta asignada al grupo de capa
                            const capa = nodoSeleccionado.children.find(capa => capa.label === resultado.label);
                            if (!capa) {
                                nodoSeleccionado.children.push(resultado);
                            }
                        }
                    });
                } else {
                    // se elimina las capa con sus operaciones
                    // Del nodo padre de la capa operacones (nodoSeleccionado) se recorre sus hijos
                    let newCapas = nodoSeleccionado.children;
                    console.log('s-- SE ELIMINA ----')
                    console.log("resultados ",resultados);
                    console.log('listaCheckeadosOperacionesCapas: ', listaCheckeadosOperacionesCapas); // ids de operadciones checkeados de las capas
                    resultados.forEach(capa => {
                        if (capa) {
                            if (listaCheckeadosOperacionesCapas.length > 0) {
                                listaCheckeadosOperacionesCapas.forEach(operacion => {
                                    const operacioneliminar = capa.children.find(op => op.label === operacion);
                                    if (operacioneliminar) {
                                        console.log('operacioneliminar.... ', operacioneliminar);
                                        eliminarOperacionCapa(operacioneliminar);
                                        const newListaCheckeadosOperacionesCapas = listaCheckeadosOperacionesCapas.filter(oper => oper !== operacion);
                                        setListaCheckeadosOperacionesCapas(newListaCheckeadosOperacionesCapas);
                                    }
                                });
                            }
                            if (newCapas) {
                                newCapas = newCapas.filter(micapa => micapa.id !== capa.id);
                            }
                            // -- aca elimino las operaciones relaciones a la capa
                            // eliminarOperacionCapa(capa.children);
                        }
                    });
                    console.log('newCapas', newCapas);
                    if (newCapas.length > 0) {
                        nodoSeleccionado.children = newCapas;
                    } else {
                        nuevasOperaciones = nuevasOperaciones.filter(nodo => nodo.id !== nodoSeleccionado.id);
                    }
                    // listarOperacionesAsignadas(parseInt(usuario.id));
                    console.log('s-- END SE ELIMINA ----');
                }
            } else {
                // aca se agrega el nuevo nodo con sus hijos
                console.log('no hay nodo');
                let children = [];
                resultados.forEach(capa => {
                    if (capa) children.push(capa);
                });
                if (children.length > 0) {
                    let capaOperaciones = {
                        __typename,
                        children,
                        id,
                        label,
                        value
                    };
                    nuevasOperaciones.push(capaOperaciones);
                    console.log('nuevasOperaciones: ', nuevasOperaciones);
                }
            }
            setListaOperaciones(nuevasOperaciones);
        }, reasen => {
            setMensaje({ texto: `Error: ${reasen}`, tipo: TIPO_ALERTA.ERROR })
        });
    }

    function eliminarOperacionCapa(operacion) {
        // verif
        setLoading(true);
        setMensaje(mensajeInicial);
        const { id: idOperacion } = operacion;
        client.mutate({
            mutation: REGISTRAR_ELIMINAR_OPERACION_USUARIO,
            variables: { idUsuarioSistema: parseInt(usuario.id), idOperacion: parseInt(idOperacion), checked: false }
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

    function verificarAsignacionAlMenu(idUsuario, idCapa, value, checked, listaChecked, grupoCapaSeleccionado, item) {
        return client.mutate({
            mutation: VERIFICAR_CAPA_DEL_MENU_PERMISO,
            variables: { idUsuario, idCapa }
        }).then((data) => {
            const { verificarMenuPermisoActivo } = data.data.sistema;
            if (verificarMenuPermisoActivo) {
                setMensaje({ texto: `La capa "${value}", esta ligado a una operación.`, tipo: TIPO_ALERTA.ADVERTENCIA })
            } else {
                // aqui el metodo elimina el permiso
                return metodoRegistrarPermiso(idUsuario, idCapa, checked, listaChecked, grupoCapaSeleccionado, item);
            }
            return null;
        }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }) )
        .finally(() => setLoading(false) );
    }

    function registrarPermiso(infoNode, grupoCapaSeleccionado, item, listaChecked, isOrigenMenu) {
        // registrarPermiso({idCapa: capa.id, value: capa.nombre, checkeado }, listaCheckeados, true);
        const { idCapa, value, checkeado } = infoNode;
        if (!verificarCheckeado(value, checkeado)) {
            setLoading(true);
            setMensaje(mensajeInicial);
            if (isOrigenMenu) {
                return metodoRegistrarPermiso(parseInt(usuario.id), parseInt(idCapa), checkeado, listaChecked, grupoCapaSeleccionado, item);
            } else {
                if (!checkeado) {
                    return verificarAsignacionAlMenu(parseInt(usuario.id), parseInt(idCapa), value, checkeado, listaChecked, grupoCapaSeleccionado, item);
                } else {
                    return metodoRegistrarPermiso(parseInt(usuario.id), parseInt(idCapa), checkeado, listaChecked, grupoCapaSeleccionado, item);
                }
            }
        }
        return null;
    }

    function metodoRegistrarPermiso(idUsuarioSistema, idCapa, checked, listaChecked, grupoCapaSeleccionado, item) {
        return client.mutate({
            mutation: REGISTRAR_ELIMINAR_PERMISO_USUARIO_CAPA,
            variables: { idUsuarioSistema, idCapa, checked }
        }).then((data) => {
            const { registrarEliminarPermisoUsuarioCapa } = data.data.sistema;
            registrarEliminarPermisoUsuarioCapa && setChecked(listaChecked);
            // aqui el metodo elimina el permiso
            // retorno nomas las capas 
            /** */
            return listarOperacionesDelCapa(grupoCapaSeleccionado, checked, item);
        }).catch((error) => setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR }) )
        .finally(() => setLoading(false) );
    }

    function listarOperacionesDelCapa(grupoCapaSeleccionado, checkeado, item) { // idCapa, checked
        if (!checkeado) {
            // solo retorna la capa con sus oepraciones
            const { id } = grupoCapaSeleccionado; // idcapa
            const nodoSeleccionado = listaOperaciones.find(nodo => nodo.id === id);
            const capa = nodoSeleccionado.children.find(capa => capa.id === item.id);
            return capa;
        } else {
            console.log('grupoCapaSeleccionado parent: ', grupoCapaSeleccionado);
            console.log('item: ', item);
            const idCapa = parseInt(item.id);
            setLoading(true);
            setMensaje(mensajeInicial);
            return client.query({
                query: LISTA_OPERACIONES_CAPA,
                variables: { idCapa },
                fetchPolicy: "network-only"
            }).then(({ data }) => {
                const { listaOperacionesCapa } = data.sistema;
                if (listaOperacionesCapa.length > 0) {
                    console.log('---------listarOperacionesDelCapa-----');
                    console.log('listaOperacionesCapa: ', listaOperacionesCapa);
                    let newItem = {...item};
                    newItem.children = listaOperacionesCapa;
                    console.log('newItem: ', newItem);
                    return newItem;
                }
                return null;
            }).catch((error) => {
                setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
            })
            .finally(() => setLoading(false) );
        }
    }

    function verificarCheckeado(value, checkeeado) {
        if (checkeeado) {
            const item = checked.find(item => item === value);
            return item;
        }
        return checkeeado;
    }

    function onExpand(expanded) {
        setExpanded(expanded);
    }

    return (
        <TabComponentContainer>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            <SearchFiltrar filtroGlobal={filterText} onChangeFiltro={handleInputChange} isLargo={true}/>
            <CheckboxTreeModel nodes={capasFiltered} checked={checked} expanded={expanded}
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
                // optimisticToggle={false}
                // onlyLeafCheckboxes={true}
            />
        </TabComponentContainer>
    );
}

export default ListaPermisosCapas;