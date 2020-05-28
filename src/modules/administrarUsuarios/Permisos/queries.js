import gql from 'graphql-tag';

export const OPCIONES_AUTORIZADAS_MENU = gql`
query OpcionesMenuAutorizadasUsuario($idUsuario: ID){
  sistema{
    opcionesMenuAutorizadasUsuario(idUsuario:$idUsuario)
  }
}
`;

export const CAPAS_AUTORIZADAS = gql`
query CapasAutorizadasUsuario($idUsuario: ID!){
  sistema{
    capasAutorizadasUsuario(idUsuario:$idUsuario)
  }
}
`;

export const INFORMES_AUTORIZADOS = gql`
query informesAutorizados($idUsuario: ID) {
  sistema {
    informesCapaAutorizadosUsuario(idUsuario: $idUsuario)
  }
}
`;