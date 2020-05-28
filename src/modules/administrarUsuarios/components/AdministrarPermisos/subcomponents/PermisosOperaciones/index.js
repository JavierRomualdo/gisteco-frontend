import React, { useState, useEffect } from 'react';
import TabComponentContainer from '../../../../../global/components/TabComponentContainer';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../../../lib/alerts';
import SearchFiltrar from '../../../../../global/components/SearchFilter';
import CheckboxTreeModel from '../../../../../global/components/CheckboxTreeModel';
import { MinusIcon } from '../../../../../../lib/icons';
import { REGISTRAR_ELIMINAR_OPERACION_USUARIO } from './mutations';
import { useApolloClient } from 'react-apollo-hooks';
import { LISTAR_PERMISOS_OPERACIONES_CAPA } from '../../queries';

const PermisosOperaciones = ({listaOperaciones, disabled, setLoading, usuario, listaCheckeadosOperacionesCapas, setListaCheckeadosOperacionesCapas}) => {
    const [operaciones, setOperaciones] = useState([]);
    const [operacionesFiltered, setOperacionesFiltered] = useState([]);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    // const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [filterText, setFilterText] = useState('');
    const client = useApolloClient();

    useEffect(() => {
        setOperaciones(listaOperaciones);
        setOperacionesFiltered(listaOperaciones);
        if (listaOperaciones.length > 0) {
            console.log('listarOperacionesAsignadasCapa.-.-.--.: ', listaOperaciones);
            listarOperacionesAsignadasCapa();
        }
    }, [listaOperaciones]);

    function listarOperacionesAsignadasCapa() {
        setLoading(true);
        setMensaje(mensajeInicial);
        client.query({
            query: LISTAR_PERMISOS_OPERACIONES_CAPA,
            variables: { idUsuarioSistema: parseInt(usuario.id) },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listaPermisosUsuarioOperacion } = data.sistema;
            if (listaPermisosUsuarioOperacion.length > 0) {
                console.log('----- operaciones chekeadas: ', listaPermisosUsuarioOperacion);
                setListaCheckeadosOperacionesCapas(listaPermisosUsuarioOperacion.map((item) => item.label ));
            }
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        })
        .finally(() => setLoading(false) );
    }

    function handleInputChange(e) {
        const value = e.target.value;
        setFilterText(value);
        filterTree(value);
    }

    function filterTree(filter) {
        if (!filter) {
            setOperacionesFiltered(operaciones);
        } else {
            setOperacionesFiltered(operaciones.reduce((filtered, node) => filterNodes(filtered, node, filter), []));
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
        if (!targetNode.children) {
            const item = targetNode.parent.children[targetNode.index];
            registrarPermiso({idOperacion: item.id, value: targetNode.value, checkeado: targetNode.checked}, listaChecked);
        }
    }

    function registrarPermiso(infoNode, listaChecked) {
        const {idOperacion, checkeado: checked} = infoNode;
        console.log('regsitrar operacion...');
        console.log('infoNode: ', infoNode);
        setLoading(true);
        setMensaje(mensajeInicial);
        client.mutate({
            mutation: REGISTRAR_ELIMINAR_OPERACION_USUARIO,
            variables: { idUsuarioSistema: parseInt(usuario.id), idOperacion: parseInt(idOperacion), checked }
        }).then((data) => {
            const { registrarEliminarOperacionesUsuarioCapa } = data.data.sistema;
            if (registrarEliminarOperacionesUsuarioCapa) {
                if (checked) {
                    console.log(`La operacion ${idOperacion} se ha ingresado correctamente.`);
                } else {
                    console.log(`La operacion ${idOperacion} se ha eliminado correctamente.`);
                }
            }
            // setChecked(listaChecked);
            setListaCheckeadosOperacionesCapas(listaChecked);
        }).catch((error) => setMensaje({ texto: `Error: ${error.message}`, tipo: TIPO_ALERTA.ERROR }) )
        .finally(() => setLoading(false) );
    }

    function onExpand(expanded) {
        setExpanded(expanded);
    }

    return (
        <TabComponentContainer>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
            <SearchFiltrar filtroGlobal={filterText} onChangeFiltro={handleInputChange} isLargo={true}/>
            <CheckboxTreeModel nodes={operacionesFiltered} checked={listaCheckeadosOperacionesCapas} expanded={expanded}
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
                onlyLeafCheckboxes={true}
            />
        </TabComponentContainer>
    );
}

export default PermisosOperaciones;