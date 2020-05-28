import { lazy } from 'react';
import { cargarComponenteAsincrono } from '../async';

export const mapeadorComponentes = {
    // Catastro
    'buscarCalle': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/BuscarCalle'))),
    'buscarHabilitacionUrbana': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/BuscarHabilitacionUrbana'))),
    'buscarUsuarioNombre': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/BuscarUsuarioNombre'))),
    'buscarUsuarioPorCodigoSuministro': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/BuscarUsuarioSuministro'))),
    'buscarUsuarioPorCodigoCatastral': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/BuscarUsuarioCodigoCatastral'))),
    'buscarUsuarioPorMedidor': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/BuscarUsuarioMedidor'))),
    'buscarManzana': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/BuscarManzana'))),
    // Administrar Usuarios
    'aprobarSolicitudes': cargarComponenteAsincrono(lazy(() => import('../../modules/administrarUsuarios/components/AprobarSolicitudes'))),
    'administrarPermisos': cargarComponenteAsincrono(lazy(() => import('../../modules/administrarUsuarios/components/AdministrarPermisos'))),
    'darBajaUsuario': cargarComponenteAsincrono(lazy(() => import('../../modules/administrarUsuarios/components/DarBajaUsuario'))),
    // Herramientas Sesion
    'cambiarContrasena': cargarComponenteAsincrono(lazy(() => import('../../modules/herramientasSesion/components/CambiarContrasena'))),
    // Herramientas
    'mostrarEstilo': cargarComponenteAsincrono(lazy(() => import('../../modules/herramientas/Estilos'))),
    'mostrarFiltroGeometrico': cargarComponenteAsincrono(lazy(() => import('../../modules/herramientas/FiltroGeometrico'))),
    // Operaciones
    'registrarFugaRedPrimariaSecundaria': cargarComponenteAsincrono(lazy(() => import('../../modules/operaciones/RegistrarFugaRedPrimariaSecundaria'))),
    'registrarFugaConexionDomiciliaria': cargarComponenteAsincrono(lazy(() => import('../../modules/operaciones/RegistrarFugaConexionDomiciliaria'))),
    'reporteFugas': cargarComponenteAsincrono(lazy(() => import('../../modules/operaciones/reporteFugas'))),
    'filtroCQL': cargarComponenteAsincrono(lazy(() => import('../../modules/herramientas/FiltroCQL'))),
    // Catastro
    'georeferenciarUsuario': cargarComponenteAsincrono(lazy(() => import('../../modules/catastro/components/GeoreferenciarUsuario')))
};