import gql from 'graphql-tag';

export const LISTAR_LECTURA_SUMINISTRO = gql`
query LecturasUsuario($suministro: Int!){
    comercial{
      lecturasUsuario(suministro:$suministro){
        id_medidor
        periodo
        lectura_diametro_mayor
        lectura_diametro_menor
        tipo_lectura
        lectura_criticada
        fecha_lectura
      }
    }
  }
`;

export const LISTAR_FACTURACION_SUMINISTRO = gql`
query FacturacionUsuario($suministro: Int!){
  comercial{
    facturacionUsuario(suministro:$suministro){
      codigo_recibo
      fecha_emision:fechaemision
      fecha_vencimiento:fechavencimiento
      fecha_pago
      total_pendiente:totalpendiente
      volumen_facturado
      estado_recibo
      meses_atrasados
    }
  }
}
`;

export const LISTAR_CONSUMO_SUMINISTRO = gql`
query ConsumosUsuario($suministro: Int!){
  comercial{
    consumosUsuario(suministro:$suministro){
      periodo
      consumo_agua_real:consumoaguareal
      consumo_agua_facturable:consumoaguafacturable
      origen_consumo
      origen_consumo_abrev
    }
  }
}
`;