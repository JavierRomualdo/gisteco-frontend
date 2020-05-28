import gql from 'graphql-tag';

export const LISTA_CAPAS_ASIGNADAS_MENU = gql`
query listaCapasAsignadasMenu($idMenu: Int!){
    sistema{
      listaCapasAsignadasMenu(idMenu:$idMenu) {
                id
                nombre
        		nombre_geoserver
        		id_grupo
        		orden_presentacion
        		ruta
            }
        }
    }
`;

export const LISTA_OPERACIONES_MENU = gql`
query listaOperacionesMenu($idMenu: Int!){
    sistema{
      listaOperacionesMenu(idMenu:$idMenu) {
          id
          nombre
      }
   }
}
`;

export const LISTA_OPERACIONES_CAPA = gql`
query listaOperacionesCapa($idCapa: Int!){
    sistema{
      listaOperacionesCapa(idCapa:$idCapa) {
          id
          label: nombre
          value: nombre
      }
   }
}
`;