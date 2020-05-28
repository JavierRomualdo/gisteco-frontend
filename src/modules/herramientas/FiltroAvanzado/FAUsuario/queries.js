import gql from 'graphql-tag';

// QUERIES USUARIOS
export const LISTAR_ESTADO_PREDIO = gql`
query listaEstadoPredio {
    catastro{
        listaEstadoPredio {
        nombre
      }
    }
  }
`;

export const LISTAR_TIPO_SERVICIO = gql`
query listaTipoServicio {
    catastro{
        listaTipoServicio {
            nombre
      }
    }
  }
`;

export const LISTAR_CATEGORIA_PREDIO = gql`
query listaCategoriaPredio {
    catastro{
        listaCategoriaPredio {
            nombre
      }
    }
  }
`;