import gql from 'graphql-tag';

export const GET_DISTRITOS_PROVINCIAS = gql`
query getDistritosDeProvincia($idProvincia: Int!){
    catastro{
      getDistritosDeProvincia(idProvincia:$idProvincia){
        id
        nombre
      }
    }
  }
`;
