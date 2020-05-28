import gql from 'graphql-tag';

export const NUEVO_ARCHIVO = gql`
mutation nuevoArchivoSubido(
    $nombreArchivo: String!,
  	$gid: Int!,
  	$nombreCapa: String!
  	$extensionArchivo: String!,
  	$rutaArchivo: String!
)
{
    comercial{
        nuevoArchivoSubido(
        	nombreArchivo: $nombreArchivo,
        	gid: $gid,
            nombreCapa: $nombreCapa,
            extensionArchivo: $extensionArchivo,
            rutaArchivo: $rutaArchivo
        )
    }
}
`;

export const ELIMINAR_ARCHIVO = gql`
mutation eliminarArchivo(
    $gidArchivo: Int!,
    $ruta: String!
)
{
    comercial{
        eliminarArchivo(
            gidArchivo: $gidArchivo,
            ruta: $ruta
        )
    }
}
`;

export const ACTUALIZAR_ARCHIVO = gql`
mutation actualizarArchivo(
    $gidArchivo: Int!,
    $descripcion: String!
)
{
    comercial{
        actualizarArchivo(
            gidArchivo: $gidArchivo,
            descripcion: $descripcion
        )
    }
}
`;

export const UPLOAD_FILE = gql`
mutation uploadFile(
    $file: Upload!,
    $gid: Int!,
    $idCapa: Int!,
    $ruta: String!,
    $tipo_archivo: String!,
    $descripcion: String!
)
{
    comercial{
        uploadFile(
            file: $file,
            gid: $gid,
            idCapa: $idCapa,
            ruta: $ruta,
            tipo_archivo: $tipo_archivo,
            descripcion: $descripcion
        )
    }
}
`;

export const UPLOAD_FILES = gql`
mutation uploadFiles(
    $files: [Upload!]!
)
{
    comercial{
        uploadFiles(
            files: $files            
        )
    }
}
`;
