import gql from 'graphql-tag';

export const ARBOL_PERMISOS_MENU_PRINCIPAL = gql`
query menuPrincipal($todos: Boolean!) {
    permisos: sistema {
      menuPrincipal(todos: $todos) {
        value:id
        label:titulo
        children: opciones{
          value:id
          label:titulo        
        }
      }      
    }
  }
`;