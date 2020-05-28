import gql from 'graphql-tag';

export const CONCEDER_PERMISOS_MENU = gql`
mutation concederPermisosMenu($idUsuario: ID!, $opcionesMenu: [ID!]!) {
    sistema {
      concedido: concederPermisosMenu(idUsuario: $idUsuario, opcionesMenu: $opcionesMenu)
    }
  }  
`;

export const QUITAR_PERMISOS_MENU = gql`
mutation quitarPermisosMenu($idUsuario: ID!, $opcionesMenu: [ID!]!) {
    sistema {      
      quitado: quitarPermisosMenu(idUsuario: $idUsuario, opcionesMenu: $opcionesMenu)
    }
  }  
`;

export const CONCEDER_PERMISO_A_CAPAS = gql`
mutation concederPermisoACapas($idUsuario: ID!, $capas: [ID!]!){
    sistema{    
      concedido: concederPermisoACapas(idUsuario:$idUsuario,capas:$capas)
    }
  }
`;

export const QUITAR_PERMISO_A_CAPAS = gql`
mutation quitarPermisoACapas($idUsuario: ID!, $capas: [ID!]!){
    sistema{    
      quitado: quitarPermisoACapas(idUsuario:$idUsuario,capas:$capas)
    }
  }
`;

export const CONCEDER_PERMISO_A_INFORMES_CAPAS = gql`
mutation ConcederPermisoAInformesCapas($idUsuario: ID!, $informes: [ID!]!) {
  sistema {
    concedido: concederPermisoAInformesCapas(idUsuario: $idUsuario, informes: $informes)
  }
}
`;

export const QUITAR_PERMISO_A_INFORMSE_CAPAS = gql`
mutation QuitarPermisoAInformesCapas($idUsuario: ID!, $informes: [ID!]!) {
  sistema {
    quitado: quitarPermisoAInformesCapas(idUsuario: $idUsuario, informes: $informes)
  }
}
`;