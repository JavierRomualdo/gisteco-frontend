import gql from 'graphql-tag';

export const LISTAR_ARCHIVOS = gql`
query listarArchivos($featureGid: Int!, $idCapa: Int!){
    comercial{
        listarArchivos(featureGid:$featureGid, idCapa: $idCapa) {
            gid
            nombre
            tipo_archivo
            ruta
            fecha_subida
            descripcion
            creador
        }
    }
}
`;

export const LISTAR_IMAGENES = gql`
query listarImagenes($featureGid: Int!, $idCapa: Int!){
    comercial{
        listarImagenes(featureGid:$featureGid, idCapa: $idCapa) {
            gid
            nombre
            tipo_archivo
            ruta
            fecha_subida
            descripcion
            creador
        }
    }
}
`;