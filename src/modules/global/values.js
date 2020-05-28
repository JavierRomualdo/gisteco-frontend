export const NUMBER_REGEXP = /^\d*$/;
export const DIGITOS_DNI_REGEXP = /\d{8}/;
export const CARACTERES_6_AND_12_REGEXP = ".{6,12}";

export const type = {
    text: 'text',
    password: 'password',
    button: 'button',
    submit: 'submit'
}

// MENSAJES
export const MSJ_NO_HAY_USUARIOS = 'No se ha encontraron usuarios';
export const MSJ_INGRESE_CORREO_ELECTRONICO = 'Ingrese su correo electrónico';

// TAG
export const TAG_DNI = 'DNI';
export const TAG_NOMBRE = 'Nombre';
export const TAG_CORREO = 'Correo';
export const TAG_CARGO = 'Cargo';
export const TAG_DEPENDENCIA = 'Dependencia';
export const TAG_ZONAL = 'Zonal';
export const TAG_FECHA_SOLICITUD = 'Fecha solicitud';
export const TAG_ACCIONES = 'Acciones';
export const TAG_RESULTADOS = 'Resultados';
export const TAG_APROBAR = 'Aprobar';
export const TAG_DESAPROBAR = 'Desaprobar';
export const TAG_MOTIVO = 'Motivo';

// LABEL
export const LABEL_ACEPTAR = 'Aceptar';
export const LABEL_CANCELAR = 'Cancelar';
export const LABEL_LIMPIAR = 'Limpiar';
export const LABEL_REGRESAR = 'Regresar';
export const LABEL_ENVIAR = 'Enviar';
export const LABEL_GUARDAR = 'Guardar';
export const LABEL_ACTUALIZAR = 'Actualizar';
export const LABEL_ELIMINAR = 'Eliminar';
export const LABEL_ATRAS = 'Atras';
export const LABEL_BUSCAR = 'Buscar';
export const LABEL_CALCULAR = 'Calcular';
export const LABEL_BORRAR = 'Borrar';
export const LABEL_CORREO_ELECTRONICO = 'Correo electrónico';
export const LABEL_SISTEMA_INFORMACION_GEOGRAFICA = 'Sistema de información geográfica';
export const LABEL_EPS_GRAU_SA = 'EPS GRAU S.A.';
export const LABEL_ZOOM = 'zoom';

// ESTADO
export const ESTADO_CARGANDO = "Cargando";
export const ESTADO_NORMAL = "Normal";
export const ESTADO_ERROR = 'Error';
export const ESTADO_EXITO = 'Exito';
export const ESTADO_CLOUD = 'Nube';

// COLOR
export const COLOR_CONFIRM_BUTTON = '#3085d6';
export const COLOR_CANCEL_BUTTON = '#d33';

/**
 * NOMBRES DE LAS PROPIEDADES QUE CONTIENEN LAS
 * EXPRESIONES DE LOS FILTROS GEOMÉTRICO Y AVANZADO
 */

export const FILTRO_ESPACIAL_KEY = 'FILTRO_ESPACIAL_KEY',
    FILTRO_AVANZADO_KEY = 'FILTRO_AVANZADO_KEY';
