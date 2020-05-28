import gql from 'graphql-tag';

export const FILTRO_USUARIOS = gql`
query UsuariosActivosSistema($filtroNombre: String, $filtroDni: String) {
    sistema {
      usuarios: usuariosActivosSistema(filtroNombre: $filtroNombre, filtroDni: $filtroDni) {
        id
        nombre_completo
      }
    }
  }  
`;