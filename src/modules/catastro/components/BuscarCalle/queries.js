import gql from 'graphql-tag';

export const BUSCAR_CALLE = gql`
query buscarCalle($calle: String!){
    catastro{
        buscarCalle(calle:$calle) {
            id
            nombre
            }
        }
    }
`;