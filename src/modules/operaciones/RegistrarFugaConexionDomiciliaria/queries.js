import gql from 'graphql-tag';

export const CALCULAR_PERDIDA_FUGA = gql`
query volumenPerdidoDeFugaEnConexionDomiciliaria(
    $fechaInicio: String!,
    $fechaSolucion: String!,
    $diametroTuberia: String!
  ){
    operaciones{
      volumenPerdido: volumenPerdidoDeFugaEnConexionDomiciliaria(
        fechaInicio: $fechaInicio,
        fechaSolucion: $fechaSolucion,
        diametroTuberia: $diametroTuberia
      )
    }
  }
`;