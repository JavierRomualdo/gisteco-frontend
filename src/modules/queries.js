import gql from 'graphql-tag';

const fragments = {
    propiedadesCapa: gql`
        fragment propiedadesCapa on Capa{
            id
            nombre
            nombre_geoserver
            orden_superposicion
        }
    `,
    propiedadesGrupoCapas: gql`
        fragment propiedadesGrupoCapas on GrupoCapa{
            id
            nombre
        }
    `
}

export const CAPAS = gql`
query capas (
  $todos: Boolean
) {
  sistema{
    arbolCapas (
      todos: $todos
    ){
      __typename,
      ... propiedadesCapa
      ... propiedadesGrupoCapas
      ... on GrupoCapa{
        elementos{
          __typename,
          ... propiedadesCapa
          ... propiedadesGrupoCapas
          ... on GrupoCapa{
            elementos{
              __typename,
              ... propiedadesCapa
              ... propiedadesGrupoCapas
              ... on GrupoCapa{
                elementos{
                  __typename,
                  ... propiedadesCapa
                }
              }
            }
          }
        }
      }
    }
  }
}
  ${fragments.propiedadesCapa}
  ${fragments.propiedadesGrupoCapas}
`;

export const LISTAR_CAPAS = gql`
query listaCapas($filtroNombre: String){
  sistema{
    listaCapas(filtroNombre:$filtroNombre){
      id
      ruta
    }
  }
}
`;