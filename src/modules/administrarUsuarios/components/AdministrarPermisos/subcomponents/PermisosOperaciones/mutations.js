import gql from 'graphql-tag';

export const REGISTRAR_ELIMINAR_OPERACION_USUARIO = gql`
mutation registrarEliminarOperacionesUsuarioCapa(
  $idUsuarioSistema: Int!,
  $idOperacion: Int!,
  $checked: Boolean!
)
{
  sistema{
    registrarEliminarOperacionesUsuarioCapa(
      idUsuarioSistema: $idUsuarioSistema,
      idOperacion: $idOperacion,
      checked: $checked
    )
  }
}
`;