import gql from 'graphql-tag';

export const PUNTOS_CONTROL = gql`
query puntosControl($tipo: Int){
    telemetria{
      puntosControl(tipo: $tipo){
        id        
        nombre
        codigo
      }
    }
  }
`