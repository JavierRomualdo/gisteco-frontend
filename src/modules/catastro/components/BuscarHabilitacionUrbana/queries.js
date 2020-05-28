import gql from 'graphql-tag';

export const BUSCAR_HABILITACION_URBANA = gql`
query buscarHabilitacionUrbana($habilitacionUrbana: String!){
    catastro{
      buscarHabilitacionUrbana(habilitacionUrbana:$habilitacionUrbana){
        id
        nombre
      }
    }
  }
`;