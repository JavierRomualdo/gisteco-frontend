import gql from 'graphql-tag';

export const CAMBIAR_CONTRASENA_USUARIO = gql`
mutation cambiarContraseniaUsuario(
  $dniUsuario: String!,
  $contraseniaActual: String!,
  $nuevaContrasenia: String!
)
{
  sistema{
    cambiarContraseniaUsuario(
      dniUsuario: $dniUsuario,
      contraseniaActual: $contraseniaActual,
      nuevaContrasenia: $nuevaContrasenia
    )
  }
}
`;