import gql from 'graphql-tag';

export const CALCULAR_PEDRIDA_FUGA = gql`
query volumenPerdidoDeFugaEnRed(
    $presionEstimada: Float!,
    $fechaInicioFuga: String!,
    $fechaSolucionFuga: String!,
    $diametroTuberia: Float!
  ){
    operaciones{
      volumenPerdido: volumenPerdidoDeFugaEnRed(
        presionEstimada:$presionEstimada,
        fechaInicioFuga: $fechaInicioFuga,
        fechaSolucionFuga: $fechaSolucionFuga,
        diametroTuberia: $diametroTuberia
      )
    }
  }
`;