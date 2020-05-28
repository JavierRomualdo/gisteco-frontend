import gql from 'graphql-tag';

export const OBTENER_CODIGO_CATASTRAL = gql`
query obtenerCodCatastralUbicacion($coordenadas: [Float!]!){
    catastro{
    codigoCatastral: obtenerCodCatastralUbicacion(coordenadas:$coordenadas){
      id_provincia
      id_distrito
      id_sector
      id_manzana
      lote
      sublote
    }
  }
}
`;

