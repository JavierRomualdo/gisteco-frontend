import gql from 'graphql-tag';

export const LISTA_CAPAS_USUARIO = gql`
query listaCapas{
    sistema {
      listaCapas: permisosCapas {
        id
        nombre      
        ruta
      }
    }
  }
`;