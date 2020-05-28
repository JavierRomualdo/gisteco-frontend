import gql from 'graphql-tag';

export const LISTAR_INSPECCIONESVMA_SUMINISTRO = gql`
query InspeccionesVMA($suministro: Int!){
  comercial{
    inspeccionesVMA(suministro:$suministro){
      fecha_inspeccion
      hora_inspeccion
      num_inscripcion
      dbo
      dqo
      sst
      ayg
      estado_inspeccion
      factor_ajuste_inspeccion
    }
  }
}
`;