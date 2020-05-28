import gql from 'graphql-tag';

export const CREAR_MARCADOR = gql`
mutation crearMarcador(
  $coordenadas: [Float!]!
  $texto: String!,
  $publico: Boolean!
)
{
  catastro{
    crearMarcador(
      coordenadas:$coordenadas,
      texto:$texto,
      publico: $publico
    )
  }
}
`;

export const ELIMINAR_MARCADOR = gql`
mutation eliminarMarcador(
  $gid: Int!
)
{
  catastro{
    eliminarMarcador(
        gid:$gid
    )
  }
}
`;

export const CAMBIAR_ACCESO_MARCADOR = gql`
mutation cambiarAccesoMarcador(
  $gid: Int!,
  $publico: Boolean!
)
{
  catastro{
    cambiarAccesoMarcador(
        gid:$gid,
        publico:$publico
    )
  }
}
`;