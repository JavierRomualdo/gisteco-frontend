/**
 * Valores que puede tomar 'estado'
 */
export const DRAWING = 'DRAWING',
    SELECTION = 'SELECTION';

/*    
    @estado es la variable que indica si en la aplicación,
    se está realizando una operación de selección, dibujo,
    o ninguna de ellas.

    En caso de que una operación de dibujo se esté llevando
    a cabo, @tareaDibujo almacenará el identificador de la
    tarea asociada a dicha operación.

    En caso de que una operación de selección se esté llevando
    a cabo, @tareaSeleccion almacenará el identificador de la
    tarea asociada a dicha operación.
*/

const mapConfig = {
    estado: '',
    tareaDibujo: '',
    tareaSeleccion: ''
}

const sidebarConfig = {
    sidebarAbierto: false,
    sidebarMaximizado: false,
    idTabActivo: ''
}

const tareasConfig = {
    tareas: [],
    idTareaActual: ''
}

const StreetViewPanoramaOptions = {
    position: { lng: -80.626908, lat: -5.196715 },
    pov: {
        heading: 0,
        pitch: 0
    }
}

/**
 * Estado relativo a filtro avanzado
 */
const usuarios = {
    estadoPredio: [],
    tipoServicio: [],
    categoriaPredio: [],
    idProvincia: '0',
    idDistrito: '0',
    georeferenciadoXGIS: false,
    periodoGeorefFechaInf: '',
    periodoGeorefFechaSup: ''
}

const tuberiasAgua = {
    idProvincia: '0',
    idDistrito: '0',
    material: [],
    funcion: [],
    tipo: [],
    aniosAntiguedad: '',
    filtrarPorIntervalo: false,
    anioInicial: '',
    anioFinal: ''
};
const tuberiasAlcantarillado = {
    idProvincia: '0',
    idDistrito: '0',
    material: [],
    tipo: [],
    aniosAntiguedad: '',
    filtrarPorIntervalo: false,
    anioInicial: '',
    anioFinal: ''
};

const problemasOperacionales = {
    idProvincia: '0',
    idDistrito: '0',
    tipologia: [],
    detalle: [],
    alcance: [],
    periodoRegistroFechaInf: '',
    periodoRegistroFechaSup: '',
    atendido: null,
    enElPlazo: null
};

const problemasComerciales = {
    idProvincia: '0',
    idDistrito: '0',
    tipologia: [],
    detalle: [],
    alcance: [],
    periodoRegistroFechaInf: '',
    periodoRegistroFechaSup: '',
    atendido: null,
    enElPlazo: null
};

const filtroAvanzado = {
    usuarios,
    tuberiasAgua,
    tuberiasAlcantarillado,
    problemasOperacionales,
    problemasComerciales
};

export default {
    ...mapConfig,
    ...sidebarConfig,
    ...tareasConfig,
    filtroAvanzado,
    StreetViewPanoramaOptions
}