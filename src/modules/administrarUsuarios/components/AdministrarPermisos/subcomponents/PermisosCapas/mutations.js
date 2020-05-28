import gql from 'graphql-tag';

export const REGISTRAR_ELIMINAR_PERMISO_USUARIO_CAPA = gql`
mutation registrarEliminarPermisoUsuarioCapa(
  $idUsuarioSistema: Int!,
  $idCapa: Int!,
  $checked: Boolean!
)
{
  sistema{
    registrarEliminarPermisoUsuarioCapa(
      idUsuarioSistema: $idUsuarioSistema,
      idCapa: $idCapa,
      checked: $checked
    )
  }
}
`;

export const VERIFICAR_CAPA_DEL_MENU_PERMISO = gql`
mutation verificarMenuPermisoActivo(
  $idUsuario: Int!,
  $idCapa: Int!
)
{
  sistema{
    verificarMenuPermisoActivo(
      idUsuario: $idUsuario,
      idCapa: $idCapa
    )
  }
}
`;