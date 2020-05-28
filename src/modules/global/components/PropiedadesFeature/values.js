export const formatearPropiedades = (propiedades,diccionario) =>  {
    let propiedadesFormateadas = []; // formato: {propiedad, valor, icono descripcion}
    for (let key in propiedades){
        if (!propiedades.hasOwnProperty(key)) continue;
        // buscar en el diccionario
        let objetoDiccionario = diccionario.find(item => item.propiedad === key);
        if (objetoDiccionario) {
            const valor = propiedades[key];
            const {nombre, descripcion, icono} = objetoDiccionario;
            propiedadesFormateadas.push({propiedad: nombre, valor, icono, descripcion});
        }
    }
    return propiedadesFormateadas;
}

export const LABEL_INFORMACION = 'Información';