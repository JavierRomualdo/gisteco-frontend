import gql from 'graphql-tag';

export const LISTA_FUGAS = gql`
query fugasANF($idProvincia: Int, $idDistrito: [Int!], $fechaInicial: String!, $fechaFinal: String!) {
  operaciones {
    fugasAnf(idProvincia: $idProvincia, idDistrito: $idDistrito, fechaInicial: $fechaInicial, fechaFinal: $fechaFinal) {
      id
      lugar_fuga
      descripcion
      referencia_ubicacion
      provincia
      distrito
      fecha_inicio
      fecha_solucion
      codigo_elemento_afectado
      diametro_tuberia
      volumen_perdido_agua
    }
  }
}
`;