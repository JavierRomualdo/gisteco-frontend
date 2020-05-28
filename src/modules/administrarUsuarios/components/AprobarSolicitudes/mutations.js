import gql from 'graphql-tag';

export const APROBAR_SOLICITUD_USUARIO = gql`
mutation AprobarSolicitudCreacionUsuario(
  $idSolicitud: Int!  
)
{
  sistema{
    aprobarSolicitudCreacionUsuario(
      idSolicitud: $idSolicitud      
    )
  }
}
`;

export const DESAPROBAR_SOLICITUD_USUARIO = gql`
mutation DesaprobarSolicitudCreacionUsuario(
  $idSolicitud: Int!,
  $motivo: String!
)
{
  sistema{
    desaprobarSolicitudCreacionUsuario(
      idSolicitud: $idSolicitud,
      motivo: $motivo
    )
  }
}
`;