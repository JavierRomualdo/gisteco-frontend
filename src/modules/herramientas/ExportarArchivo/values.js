// LABEL
export const LABEL_FORMATO = 'Formato';
export const LABEL_EXPORTAR = 'Exportar';
export const LABEL_CREANDO_ARCHIVO = 'Creando archivo';
// TITULOS
export const TITULO_ARCHIVO = 'Tìtulo del archivo';

// PLACEHOLDERS
export const PCHR_TITULO_ARCHIVO = 'Ingrese título del archivo';

export const LISTA_FORMATO = [
    {
        id: 'excel2007',
        nombre: 'Excel',
        extension: 'xlsx'
    },
    {
        id: 'csv',
        nombre: 'CSV',
        extension: 'csv'
    },
    {
        id: 'shape-zip',
        nombre: 'Shapefile',
        extension: 'shp'
    }
];

export const EXTENSION_FORMATO = {
    'csv': 'csv',
    'excel2007': 'xlsx',
    'shape-zip': 'shp'
}

export const archivoInicial = {
    nombre: '',
    extension: ''
}