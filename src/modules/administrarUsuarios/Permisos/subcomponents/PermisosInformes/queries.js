import gql from 'graphql-tag';

export const INFORMES_CAPAS = gql`
query informesCapas($capas: [ID!]!) {
    permisos: sistema {
      informesCapas(capas:$capas){
        value: id
        label: nombre
      }
    }
  }  
`;