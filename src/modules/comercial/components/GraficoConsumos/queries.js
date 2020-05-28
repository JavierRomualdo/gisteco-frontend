import gql from "graphql-tag";

export const CONSUMOS_USUARIO = gql`
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