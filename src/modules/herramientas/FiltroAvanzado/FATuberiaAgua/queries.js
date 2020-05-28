import gql from 'graphql-tag';

// QUERIES TUBERIA
export const LISTAR_MATERIAL_TUBERIA = gql`
query listaMaterialTuberia {
    operaciones{
      listaMaterialTuberia {
        nombre
      }
    }
  }
`;

export const LISTAR_FUNCION_TUBERIA = gql`
query listaFuncionTuberia {
    operaciones{
        listaFuncionTuberia {
            nombre
      }
    }
  }
`;

export const LISTAR_TIPO_TUBERIA = gql`
query listaTipoTuberia {
    operaciones{
        listaTipoTuberia {
            nombre
      }
    }
  }
`;