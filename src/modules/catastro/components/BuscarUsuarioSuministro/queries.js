import gql from 'graphql-tag';

export const BUSCAR_SUMINISTRO_CODIGO_SUMINISTRO = gql`
query buscarSuministroPorNumInscripcion($numInscripcion: String!){
  catastro{
    buscarSuministroPorNumInscription(numInscripcion:$numInscripcion) {
      num_inscripcion
      nombre_titular
    }
  }
}
`;