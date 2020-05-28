import gql from 'graphql-tag';

export const BUSCAR_SUMINISTRO_NOMBRE_TITULAR = gql`
query buscarSuministroPorNombreTitular($nombreTitular: String!,$idProvincia:Int,$idDistrito:Int){
    catastro{
      buscarSuministroPorNombreTitular(nombreTitular:$nombreTitular,idProvincia:$idProvincia,idDistrito:$idDistrito){
        num_inscripcion
        nombre_titular
        esta_georeferenciado
      }
    }
  }
`;