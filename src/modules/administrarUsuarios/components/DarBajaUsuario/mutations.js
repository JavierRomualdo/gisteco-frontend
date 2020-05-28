import gql from 'graphql-tag';

export const SUSPENDER_USUARIO_SISTEMA = gql`
mutation suspenderUsuarioSistema(
  $idUsuario: Int!,
  $motivo: String!  
)
{
  sistema{
    suspenderUsuarioSistema(
      idUsuario: $idUsuario,
      motivo: $motivo      
    )
  }
}
`;