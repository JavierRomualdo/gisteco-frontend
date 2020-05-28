import gql from 'graphql-tag';

export const GEOREFERENCIAR_USUARIO = gql`
mutation georeferenciarUsuario(
  $numInscripcion: Int!,
  $coordenadas: [Float!]!
)
{
  catastro{
    georeferenciarUsuario(
      numInscripcion:$numInscripcion,
      coordenadas: $coordenadas
    ){
      codigo_respuesta
      mensaje
    }
  }
}
`;

export const MOVER_USUARIO = gql`
mutation moverUsuario(
  $numInscripcion: Int!,
  $coordenadas: [Float!]!
)
{
  catastro{
    moverUsuario(
      numInscripcion:$numInscripcion,
      coordenadas: $coordenadas
    )
  }
}
`;