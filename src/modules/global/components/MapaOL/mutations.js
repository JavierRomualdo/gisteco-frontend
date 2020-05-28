import gql from 'graphql-tag';

export const DIVIDIR_PREDIO = gql`
mutation dividirPredio(
    $predioGid: Int!,
    $wktLinea: String!
)
{
    catastro{
        dividirPredio(
        predioGid:$predioGid,
        wktLinea: $wktLinea
        ){
        codigo_respuesta
        mensaje
        }
    }
}
`;
export const UNIR_PREDIO = gql`
mutation unirPredio(
    $wktLinea: String!
)
{
    catastro{
        unirPredio(
        wktLinea: $wktLinea
        ){
        codigo_respuesta
        mensaje
        }
    }
}
`;