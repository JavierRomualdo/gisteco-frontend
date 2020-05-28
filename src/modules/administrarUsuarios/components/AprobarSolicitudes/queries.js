import gql from 'graphql-tag';

export const LISTA_SOLICITUDES_PENDIENTES = gql`
query SolicitudesPendientesCreacionUsuario
{
  sistema{
    solicitudesPendientesCreacionUsuario {
      id
      dni
      estado_solicitud
      nombre_completo
      correo
      cargo
      dependencia
      zonal
      fecha_solicitud
    }
  }
}
`;