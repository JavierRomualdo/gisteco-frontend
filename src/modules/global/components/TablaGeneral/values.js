export const generarColumnasGeneral = (listaColumnas) => {
    const columnas = [];
    listaColumnas.forEach((columna) => {
        columnas.push({
            headerName: columna,
            field: columna,
            width: 150,
            minWidth: 150
        });
    });
    return columnas;
};

