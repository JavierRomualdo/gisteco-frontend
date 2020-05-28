import gql from 'graphql-tag';

  export const MENU_PRINCIPAL_PERMISOS = gql`
  query menuPrincipal (
    $todos: Boolean
  ) {
    sistema{
      listaMenu (
        todos: $todos
      ){
        value: id
        label: titulo
        children: opciones {
          value: id
          label: titulo
        }
      }
    }
  }`;

export const LISTAR_PERMISOS_USUARIO_MENU = gql`
query listaPermisosUsuarioMenu($idUsuarioSistema: Int!){
    sistema{
      listaPermisosUsuarioMenu(idUsuarioSistema:$idUsuarioSistema) {
            value: id
            label: nombre
            }
        }
    }
`;

export const LISTAR_PERMISOS_USUARIO_CAPA = gql`
query listaPermisosUsuarioCapa($idUsuarioSistema: Int!){
    sistema{
      listaPermisosUsuarioCapa(idUsuarioSistema:$idUsuarioSistema) {
            value: id
            label: nombre
            }
        }
    }
`;

export const LISTAR_PERMISOS_OPERACIONES_CAPA = gql`
query listaPermisosUsuarioOperacion($idUsuarioSistema: Int!){
  sistema{
    listaPermisosUsuarioOperacion(idUsuarioSistema:$idUsuarioSistema) {
          value: id
          label: nombre
          }
      }
  }
`;