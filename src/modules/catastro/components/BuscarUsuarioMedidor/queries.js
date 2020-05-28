import gql from 'graphql-tag';

export const BUSCAR_SERIE_MEDIDOR = gql`
query buscarSuministroPorNumMedidor
($numMedidor: String!){
  catastro{
    buscarSuministroPorNumMedidor(numMedidor:$numMedidor) {
      num_inscripcion
      nombre_titular
    }
  }
}
`;