import gql from 'graphql-tag';

export const BUSCAR_MANZANA = gql`
query buscarManzana
($idProvincia: Int!,$idDistrito: Int!,
  $idManzana: Int!,$idSector: Int!){
  catastro{
    buscarManzana(idProvincia:$idProvincia,
      idDistrito:$idDistrito,
      idSector:$idSector,
        idManzana: $idManzana) {
      id
      nombre_municipal
    }
  }
}
`;