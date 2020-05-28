import gql from 'graphql-tag';

export const DATOS_USUARIO = gql`query datosUsuario{
    sistema{
      datosUsuarioSistema{
          id
        nombre_completo
        dependencia
      }
    }
  }`;