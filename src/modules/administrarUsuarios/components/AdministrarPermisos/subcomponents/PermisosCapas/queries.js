import gql from 'graphql-tag';

const fragments = {
    propiedadesCapaPermiso: gql`
        fragment propiedadesCapaPermiso on Capa {
            id: id
            value: nombre
            label: nombre
        }
    `,
    propiedadesGrupoCapasPermiso: gql`
        fragment propiedadesGrupoCapasPermiso on GrupoCapa {
            id: id
            value: nombre
            label: nombre
        }
    `
}

export const CAPAS_PERMISOS = gql`
query capas (
  $todos: Boolean
) {
  sistema{
    arbolCapas (
      todos: $todos
    ){
      __typename,
      ... propiedadesCapaPermiso
      ... propiedadesGrupoCapasPermiso
      ... on GrupoCapa{
        children: elementos{
          __typename,
          ... propiedadesCapaPermiso
          ... propiedadesGrupoCapasPermiso
          ... on GrupoCapa{
            children: elementos{
              __typename,
              ... propiedadesCapaPermiso
              ... propiedadesGrupoCapasPermiso
              ... on GrupoCapa{
                children: elementos{
                  __typename,
                  ... propiedadesCapaPermiso
                }
              }
            }
          }
        }
      }
    }
  }
}
  ${fragments.propiedadesCapaPermiso}
  ${fragments.propiedadesGrupoCapasPermiso}
`;
