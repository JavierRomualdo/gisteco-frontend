import gql from 'graphql-tag';

export const APP_MAIN_DATA = gql`
query appMainData($todos: Boolean!){
    sistema{
      arbolCapas(todos:$todos){
        ... on GrupoCapa{
          id
          nombre
          elementos{
            ... on GrupoCapa{
              id
              nombre
            }
            ... on Capa{
              id
              nombre
            }
          }
        }        
      }
      listaCapas:permisosCapas{
        id
        nombre
        nombre_geoserver
        ruta
      }
      informesCapaAutorizados: informesCapaAutorizadosUsuario
      opcionesAutorizadasMenu: opcionesMenuAutorizadasUsuario
    }
  }
`;

export const MENU_PRINCIPAL = gql`
query menuPrincipal($todos: Boolean!) {
  sistema {
    menuPrincipal(todos: $todos) {
      id
      titulo
      opciones(vanEnMenu: true){
        id
        titulo
        componenteId: componente_id
      }
    }
  }
}
`;