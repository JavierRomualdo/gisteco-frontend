import gql from 'graphql-tag';

export const MENU_SIDEBAR = gql`query menuSidebar {
  sistema{
    menuSidebar{
      id: nombre
      classIcon: icono
      titulo
    }
  }
}`;