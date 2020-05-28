import React, { useState } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import TabComponentContainer from '../../../global/components/TabComponentContainer';
import { BarrasIcon, CapasIcon, LoadingIconChange, UserOperation } from '../../../../lib/icons';
import PermisosMenus from './subcomponents/PermisosMenus';
import PermisosCapas from './subcomponents/PermisosCapas';
import { TAG_MENUS, TAG_CAPAS, TAG_BUSQUEDA, PCHR_INGRESE_DATOS_USUARIO, TAG_OPERACIONES } from './values';
import Alert, { mensajeInicial, TIPO_ALERTA } from '../../../../lib/alerts';
import { LISTAR_USUARIOS_ACTIVOS_SISTEMA } from '../DarBajaUsuario/queries';
import { MSJ_ALERTA_USUARIO_INGRESE } from '../DarBajaUsuario/values';
import AutocompleteDropright from '../../../global/components/AutocompleteDropright';
import { LISTAR_PERMISOS_USUARIO_MENU, LISTAR_PERMISOS_USUARIO_CAPA } from './queries';
import PermisosOperaciones from './subcomponents/PermisosOperaciones';
import ListaPermisosCapas from './subcomponents/PermisosCapas/PermisosCapas';
const estadoInicialDarBaja = {mensaje: MSJ_ALERTA_USUARIO_INGRESE, claseText: 'text-danger font-weight-bold', correcto: false};

const ListaPermisos = ({listaMenu}) => {
    const [usuario, setUsuario] = useState(null); // Object
    const [listaCheckeadosMenus, setListaCheckeadosMenus] = useState([]);
    const [listaCheckeadosCapas, setListaCheckeadosCapas] = useState([]);
    const [datosCapasAsignadasMenu, setDatosCapasAsignadasMenu] = useState({checkeado: false, listaCapasAsignadasMenu: []});
    const [listaOperaciones, setListaOperaciones] = useState([]);
    const [listaCheckeadosOperacionesCapas, setListaCheckeadosOperacionesCapas] = useState([]);
    const [sugerencias,setSugerencias] = useState(null);
    const [mensaje, setMensaje] = useState(mensajeInicial);
    const [tipoBusqueda, setTipoBusqueda] = useState('filtroNombre');
    const [mensajeAlertaDarBaja, setMensajeAlertaDarBaja] = useState(estadoInicialDarBaja);
    const [loadingMenu, setLoadingMenu] = useState(false);
    const [loadingCapa, setLoadingCapa] = useState(false);
    const [loadingOperacion, setLoadingOperacion] = useState(false);
    const [disabledMenus, setDisabledMenus] = useState(true);
    const client = useApolloClient();

    function handleFilterUsuarios(e) {
        completarUsuarios(tipoBusqueda, e.query);
    }

    function onChangeTipoBusqueda(e) {
        setTipoBusqueda(e.target.value);
    }

    function handleInputChange(e) {
        let nuevoMensajeSuministro = {...mensajeAlertaDarBaja, mensaje: MSJ_ALERTA_USUARIO_INGRESE, 
            claseText: 'text-danger font-weight-bold', correcto: false};
        const value = e.value;
        if (typeof value === 'object' && value !== null) {
            nuevoMensajeSuministro = {...mensajeAlertaDarBaja, mensaje: "",
            claseText: 'text-success font-weight-bold', correcto: true};
            // querie listar permisos menus
            listarPermisosMenus(value.id);
            listarPermisoCapas(value.id);
            // querie listas permisos capas
        } else {
            setDisabledMenus(true);
            setListaCheckeadosMenus([]);
            setListaCheckeadosCapas([]);
            setListaOperaciones([]);
            setListaCheckeadosOperacionesCapas([]);
        }
        setMensajeAlertaDarBaja(nuevoMensajeSuministro);
        setUsuario(value);
    }

    function listarPermisosMenus(idUsuarioSistema) {
        setLoadingMenu(true);
        setMensaje(mensajeInicial);
        client.query({
            query: LISTAR_PERMISOS_USUARIO_MENU,
            variables: { idUsuarioSistema: parseInt(idUsuarioSistema) },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listaPermisosUsuarioMenu } = data.sistema;
            console.log('listaPermisosUsuarioMenu: ', listaPermisosUsuarioMenu);
            setDisabledMenus(false);
            setListaCheckeadosMenus(listaPermisosUsuarioMenu);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        }).finally(() => setLoadingMenu(false) );
    }

    function listarPermisoCapas(idUsuarioSistema) {
        setLoadingCapa(true);
        setMensaje(mensajeInicial);
        client.query({
            query: LISTAR_PERMISOS_USUARIO_CAPA,
            variables: { idUsuarioSistema: parseInt(idUsuarioSistema) },
            fetchPolicy: "network-only"
        }).then(({ data }) => {
            const { listaPermisosUsuarioCapa } = data.sistema;
            console.log('listaPermisosUsuarioCapa: ', listaPermisosUsuarioCapa);
            setDisabledMenus(false);
            setListaCheckeadosCapas(listaPermisosUsuarioCapa);
        }).catch((error) => {
            setMensaje({ texto: error.message, tipo: TIPO_ALERTA.ERROR });
        }).finally(() => setLoadingCapa(false) );
    }

    function completarUsuarios(tipofiltro, filtro) {
        client.query({
            query: LISTAR_USUARIOS_ACTIVOS_SISTEMA,
            variables: {[tipofiltro]: filtro},
            fetchPolicy: "network-only"
        }).then(({data})=>{
            const { listaUsuariosActivosSistema } = data.sistema;
            setSugerencias(listaUsuariosActivosSistema);
        })
    }
    return (
        <TabComponentContainer>
            <AutocompleteDropright etiqueta={TAG_BUSQUEDA} value={usuario} suggestions={sugerencias} completeMethod={handleFilterUsuarios}
                onChange={handleInputChange} minLength={1} placeholder={PCHR_INGRESE_DATOS_USUARIO} field="nombre_completo" id="autocompleteUsuario"
                inputClassName="form-control form-control-sm" textHelp={mensajeAlertaDarBaja.mensaje} classHelp={mensajeAlertaDarBaja.claseText}
                tipoBusqueda={tipoBusqueda} onChangeTipoBusqueda={onChangeTipoBusqueda} autoFocus={true}/>
			<ul className="nav nav-tabs mt-3" id="myTab" role="tablist">
				<li className="nav-item">
					<a className="nav-link active border-radius-0" id="menu-tab" data-toggle="tab" href="#menu" role="tab" aria-controls="menu" aria-selected="true">
                        {loadingMenu ? <div className="text-center d-inline"><LoadingIconChange tamanio="fa-xs" color="text-primary"/></div> : <BarrasIcon/>}
						<span className="d-none d-md-inline"> {TAG_MENUS} </span>
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link border-radius-0" id="capa-tab" data-toggle="tab" href="#capa" role="tab" aria-controls="capa" aria-selected="false">
                        {loadingCapa ? <div className="text-center d-inline"><LoadingIconChange tamanio="fa-xs" color="text-primary"/></div> : <CapasIcon/>}
						<span className="d-none d-md-inline"> {TAG_CAPAS} </span>
					</a>
				</li>
                <li className="nav-item">
					<a className="nav-link border-radius-0" id="operacion-tab" data-toggle="tab" href="#operacion" role="tab" aria-controls="operacion" aria-selected="false">
                        {loadingOperacion ? <div className="text-center d-inline"><LoadingIconChange tamanio="fa-xs" color="text-primary"/></div> : <UserOperation/>}
						<span className="d-none d-md-inline"> {TAG_OPERACIONES} </span>
					</a>
				</li>
			</ul>
			<div className="tab-content border" id="myTabContent">
				<div className="tab-pane fade show active" id="menu" role="tabpanel" aria-labelledby="menu-tab">
                    <PermisosMenus listaMenu={listaMenu} listaCheckeados={listaCheckeadosMenus} usuario={usuario} 
                    disabled={disabledMenus} setLoading={setLoadingMenu} setDatosCapasAsignadasMenu={setDatosCapasAsignadasMenu}/>
				</div>
				<div className="tab-pane fade" id="capa" role="tabpanel" aria-labelledby="capa-tab">
                    <ListaPermisosCapas disabled={disabledMenus} listaCheckeados={listaCheckeadosCapas} datosCapasAsignadasMenu={datosCapasAsignadasMenu}
                        usuario={usuario} setLoading={setLoadingCapa} setListaOperaciones={setListaOperaciones} listaOperaciones={listaOperaciones}
                        setListaCheckeadosOperacionesCapas={setListaCheckeadosOperacionesCapas} listaCheckeadosOperacionesCapas={listaCheckeadosOperacionesCapas}/>
				</div>
                <div className="tab-pane fade" id="operacion" role="tabpanel" aria-labelledby="operacion-tab">
                    <PermisosOperaciones setLoading={setLoadingOperacion} disabled={disabledMenus} usuario={usuario} listaOperaciones={listaOperaciones}
                    setListaCheckeadosOperacionesCapas={setListaCheckeadosOperacionesCapas} listaCheckeadosOperacionesCapas={listaCheckeadosOperacionesCapas}/>
                </div>
			</div>
            {mensaje.texto && <Alert tipo={mensaje.tipo}>{mensaje.texto}</Alert>}
		</TabComponentContainer>
    );
}

export default ListaPermisos;