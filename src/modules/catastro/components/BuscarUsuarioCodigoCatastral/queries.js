import gql from 'graphql-tag';

export const BUSCAR_SUMINISTRO_CODIGO_CATASTRAL = gql`
query buscarSuministroPorCodigoCatastral($idProvincia:Int!,$idDistrito:Int!,$idSector: Int!,$idManzana: Int!, $lote: Int!, $sublote: Int!){
    catastro{
      buscarSuministroPorCodigoCatastral(idProvincia:$idProvincia,idDistrito:$idDistrito,idSector:$idSector,idManzana:$idManzana,lote:$lote,sublote:$sublote){
        num_inscripcion
        nombre_titular
      }
    }
  }
`;