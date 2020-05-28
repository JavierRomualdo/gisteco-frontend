import gql from 'graphql-tag';

export const GET_PRINT_INFO = gql`
query getPrintInfo{
    sistema{
      printInfo{
        scales{
          nombre: name
          value
        }
        layouts{
          nombre: name
          map{
            width
            height
          }
        }
        printURL
        createURL
      }
    }
  }
`;

export const GET_RECLAMO = gql`
query getReclamo($numReclamo: String!){
    comercial{
      reclamo(numReclamo: $numReclamo){
        num_reclamo
        nombre_reclamante
        suministro
        direccion_predio
      }
    }
  }
`;