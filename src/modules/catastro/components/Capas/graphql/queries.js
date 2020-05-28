import gql from 'graphql-tag';

export const ARBOL_CAPAS_USUARIO = gql`
query arbolCapasUsuario($todos: Boolean!){
    sistema {
      arbolCapas(todos: $todos) {
        ... on GrupoCapa {
          id
          nombre
          elementos {
            ... on GrupoCapa {
              id
              nombre
            }
            ... on Capa {
              id
              nombre
            }
          }
        }
      }
    }
  }
`;