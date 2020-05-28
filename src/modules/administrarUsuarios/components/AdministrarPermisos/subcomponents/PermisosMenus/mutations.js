import gql from 'graphql-tag';

export const REGISTRAR_ELIMINAR_PERMISO_USUARIO_MENU = gql`
mutation registrarEliminarPermisoUsuarioMenu(
  $idUsuarioSistema: Int!,
  $idMenu: Int!,
  $checked: Boolean!
)
{
  sistema{
    registrarEliminarPermisoUsuarioMenu(
      idUsuarioSistema: $idUsuarioSistema,
      idMenu: $idMenu,
      checked: $checked
    )
  }
}
`;