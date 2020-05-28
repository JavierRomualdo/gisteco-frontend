import gql from 'graphql-tag';

// QUERIES TUBERIA ALCANTARILLADO
export const LISTAR_MATERIAL_TUBERIA_ALCANTARILLADO = gql`
query listaMaterialTuberiaAlcantadillado {
    operaciones{
      listaMaterialTuberiaAlcantadillado {
        nombre
      }
    }
  }
`;

export const LISTAR_TIPO_TUBERIA_ALCANTARILLADO = gql`
query listaTipoTuberiaAlcantarillado {
    operaciones{
      listaTipoTuberiaAlcantarillado {
            nombre
      }
    }
  }
`;