import gql from 'graphql-tag';

export const LISTAR_HISTORICO_CONTROL_CALIDAD = gql`
query HistoricoControlDeCalidad($codigo: String!, $id_tipo_fuente_abastecimiento: Int!){
    comercial{
        historicoControlDeCalidad(codigo:$codigo, id_tipo_fuente_abastecimiento:$id_tipo_fuente_abastecimiento){
        tipo_fuente
        gid
        fecha_registro
        parametro
        valor
        }
    }
}
`;