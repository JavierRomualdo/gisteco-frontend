export const getContextMenuItems = (params) => [
    "copy",
    "copyWithHeaders",
    "paste",
    "separator",
    {
        name: "Exportar",
        subMenu: [
            {
                name: "CSV (.csv)",
                action: function () {
                    const parametros = {
                        allColumns: true/*,
                        fileName: `repGis_${generarTituloArchivoPorDefecto(nombre)}`*/
                    }
                    params.api.exportDataAsCsv(parametros);
                }
            },
            {
                name: "Excel (.xlsx)",
                action: function () {
                    const parametros = {
                        allColumns: true/*,
                        fileName: `repGis_${generarTituloArchivoPorDefecto(nombre)}`*/
                    }
                    params.api.exportDataAsExcel(parametros);
                }
            }
        ]
    }
];


export const localeText = {
    copy: 'Copiar',
    copyWithHeaders: 'Copiar con encabezados',
    paste: 'Pegar',
    page: 'Página',
    of: 'de',
    to: 'a'
};