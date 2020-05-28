import gql from 'graphql-tag';

export const REGISTRAR_USUARIO_SOLICITUD = gql`
mutation registrarUsuarioSolicitud(
  $dni: String!,
  $nombreCompleto: String!,
  $correo: String!,
  $cargo: String!,
  $dependencia: String!,
  $zonal: Int!
)
{
  sistema{
    registrarUsuarioSolicitud(
      dni: $dni,
      nombreCompleto: $nombreCompleto
      correo: $correo,
      cargo: $cargo,
      dependencia: $dependencia,
      zonal: $zonal
    )
  }
}
`;