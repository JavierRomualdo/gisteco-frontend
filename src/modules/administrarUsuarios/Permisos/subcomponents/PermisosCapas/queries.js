import gql from 'graphql-tag';

export const ARBOL_PERMISOS_CAPAS = gql`
query arbolCapas($todos: Boolean!) {
    permisos: sistema {
      arbolCapas(todos: $todos) {
        ... on GrupoCapa {
          value: id
          label: nombre
          children: elementos {
            ... on GrupoCapa {
              value: id
              label: nombre
            }
            ... on Capa {
              value: id
              label: nombre
            }
          }
        }
      }
    }
  }
`;