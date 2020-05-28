export const generarTituloArchivoPorDefecto = (titulo) => {
    const cadenas = titulo.toLowerCase().split(' ');
    let titulo_archivo = "";
    for (let index = 0; index < cadenas.length; index++) {
        if (index < cadenas.length - 1) {
            titulo_archivo += cadenas[index] + '_';
        } else {
            titulo_archivo += cadenas[index];
        }
    }
    return titulo_archivo;
}

export const generarContextMenuItemsPorDefecto = (nombre, params) => [
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
                        allColumns: true,
                        fileName: `repGis_${generarTituloArchivoPorDefecto(nombre)}`
                    }
                    params.api.exportDataAsCsv(parametros);
                }
            },
            {
                name: "Excel (.xlsx)",
                action: function () {
                    const parametros = {
                        allColumns: true,
                        fileName: `repGis_${generarTituloArchivoPorDefecto(nombre)}`
                    }
                    params.api.exportDataAsExcel(parametros);
                }
            }
        ]
    }
];