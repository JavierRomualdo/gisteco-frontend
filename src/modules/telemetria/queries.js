import gql from 'graphql-tag';

export const LECTURAS_PUNTO_CONTROL = gql`

query puntoControl($id: Int!, $fechaInicio: String!, $fechaFin: String!, $propiedadFisica: String!,$unidades: String!) {
  telemetria {
    puntoControl(id: $id) {
      id
      id_tipo_punto_control
      nombre
      codigo
      lecturas(fechaInicio: $fechaInicio, fechaFin: $fechaFin, propiedadFisica: $propiedadFisica, unidades:$unidades) {
        ... on LecturasCello{
        	id_medidor
        	tipo_medidor
        	volumen_total
          lecturas{
            fecha
            valor_leido
          }
        }
        ... on LecturasSebalog{
        	id_datalogger
          canal
          variable_control
          volumen_total
          lecturas{
            fecha
            valor_leido
          }
        }  
      }
    }
  }
} 
`