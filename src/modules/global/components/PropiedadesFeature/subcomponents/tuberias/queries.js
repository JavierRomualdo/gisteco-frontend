import gql from 'graphql-tag';

export const LISTAR_HISTORICO_FUGA_TUBERIA = gql`
query listaFugaTuberia($gidTuberia: Int!, $tipoElemento: String!){
  operaciones{
    listaFugasTuberia(gidTuberia:$gidTuberia, tipoElemento:$tipoElemento){
      tipo_incidencia
      descripcion
      referencia_ubicacion
      fecha_hora_incidencia
      fecha_hora_solucion
      tiempo_transcurrido
      volumen_perdido_agua
    }
  }
}
`;

export const LISTAR_MANTENIMIENTO_TUBERIA = gql`
query listaMantanimientoTuberia ($gidTuberia:Int!,$tuberiaPertenece:String!){
  operaciones{
    listaMantenimientosTuberia(gidTuberia:$gidTuberia,tuberiaPertenece:$tuberiaPertenece){
      codigo
      costo_proyectado
      costo_real
      direccion
      empresa
      estado
      fecha_fin
      fecha_inicio
      tipo_comprobante
      numero
      serie
      acciones{
        codigo
        descripcion
      }
    }
  }
}
`;
