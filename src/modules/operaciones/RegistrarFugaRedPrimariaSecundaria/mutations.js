import gql from 'graphql-tag';

export const REGISTRAR_FUGA = gql`
mutation registrarFugaEnRed(
  $idCorrTipoReclamoProblema: Int!,
  $descripcion: String,
  $referenciaUbicacion: String,
  $fechaInicioFuga: String!,
  $horaInicio: String!,
  $fechaSolucionFuga: String!,
  $horaSolucion: String!,
  $gidTuberiaAfectada: Int!,
  $materialTuberia: String!,
  $diametroTuberia: Float!,
  $presionEstimada: Float!,
  $problemasRelacionados: [Int]
  ){
    operaciones{
      registrarFugaEnRed(
            idCorrTipoReclamoProblema:$idCorrTipoReclamoProblema,
            descripcion: $descripcion,
            referenciaUbicacion:$referenciaUbicacion,
            fechaInicioFuga: $fechaInicioFuga,
            horaInicio: $horaInicio,
            fechaSolucionFuga: $fechaSolucionFuga,
            horaSolucion: $horaSolucion,
            gidTuberiaAfectada: $gidTuberiaAfectada,
            materialTuberia:$materialTuberia,
            diametroTuberia: $diametroTuberia,
            presionEstimada: $presionEstimada,
            problemasRelacionados: $problemasRelacionados            
      )
    }
  }
`;