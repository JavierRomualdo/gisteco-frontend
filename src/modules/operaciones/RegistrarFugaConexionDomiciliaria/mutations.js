import gql from 'graphql-tag';

export const REGISTRAR_FUGA = gql`
mutation registrarFugaEnConexionDomiciliaria(
    $descripcion: String,
    $referenciaUbicacion: String,
    $fechaInicio: String!,
    $horaInicio: String!,
    $fechaSolucion: String!,
    $horaSolucion: String!,
    $suministro: Int!,
    $materialTuberia: String!,
    $diametroTuberia: String!,
    $id_causa: Int!,
    $otra_causa: String,
    $problemasRelacionados: [Int]    
    ){
      operaciones{
        registrado: registrarFugaEnConexionDomiciliaria(
              descripcion: $descripcion,
              referenciaUbicacion:$referenciaUbicacion,
              fechaInicio: $fechaInicio,
              horaInicio: $horaInicio,
              fechaSolucion: $fechaSolucion,
              horaSolucion: $horaSolucion,
              suministro: $suministro,
              materialTuberia:$materialTuberia,
              diametroTuberia: $diametroTuberia,
              id_causa: $id_causa,
              otra_causa: $otra_causa,
              problemasRelacionados: $problemasRelacionados              
        )
      }
    }
`;