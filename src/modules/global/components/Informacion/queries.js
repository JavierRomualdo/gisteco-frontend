import gql from 'graphql-tag';

export const DICCIONARIO_CAPA = gql`
query DiccionarioCapa($idCapa: Int!){
    sistema{
      diccionarioCapa(idCapa:$idCapa){
        id
        propiedad
        nombre: nombre_presentacion
        descripcion: definicion
        icono
      }
    }
  }
`;