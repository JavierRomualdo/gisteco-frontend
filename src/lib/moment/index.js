import * as moment from 'moment-timezone';
moment.locale('es');

export const fomatearFechaString =  (fecha, formato) => {
    return moment(fecha, formato).toDate();
}

export const fomatearFechaAString =  (fecha, formato) => {
    return moment(fecha).format(formato);
}

export const obtenerFechaActual = () => { // DE LA PC DE USUARIO
    return moment().format('DD-MM-YYYY'); // DD-MM-YYYY YYYY-MM-DD
}

export const obtenerFechaActualYTiempo = () => { // DE LA PC DE USUARIO
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

export const obtenerHoraActual = () => {
    return moment().format('hh:mm a');
}

export const generarAnioAntiguedad = (numero) => (
    moment(FECHA_ACTUAL).subtract(numero, 'year').format('YYYY')
);

export const FECHA_ACTUAL = fomatearFechaString(obtenerFechaActual(), 'DD-MM-YYYY');

export const FECHA_INICIO = fomatearFechaString(moment().startOf('month').format("DD-MM-YYYY"), 'DD-MM-YYYY');

export const HORA_ACTUAL = fomatearFechaString(obtenerHoraActual(), 'hh:mm a');
// var jun = moment();
// console.log(jun.tz('America/Lima').format('DD-MM-YYYY HH:mm:ss'));  // 5am PDT