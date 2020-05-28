import gql from 'graphql-tag';

export const OBTENER_CODIGO_CATASTRAL = gql`
query obtenerCodigoCatastral($suministro: Int!) {
  catastro {
    codSisgeco: obtenerCodCatastralSisgeco(suministro: $suministro)
    codGisteco: obtenerCodCatastralGisteco(suministro: $suministro)
  }
}
`;
export const OBTENER_CODIGO_CATASTRAL_USUARIO_POTENCIAL = gql`
query obtenerCodigoCatastralUsuarioPotencial($gid: Int!) {
  catastro {
    codCatastral: obtenerCodCatastralUsuarioPotencial(gid: $gid)
  }
}
`;