import { CALCULAR_PEDRIDA_FUGA } from "./queries";
import { REGISTRAR_FUGA } from "./mutations";
import moment from 'moment';

const formatDate = (d) => moment(d).format('YYYY-MM-DD');
const formatTime = (tStr) => (moment(tStr, 'hh:mm a')).format('HH:mm:ss');
const formatDateTime = (d, tStr) => `${formatDate(d)} ${formatTime(tStr)} `;

const formatVariables4Perdida = ({
    fechaInicioFuga: fi,
    horaInicio: hi,
    fechaSolucionFuga: fs,
    horaSolucion: hs,
    diametroTuberia,
    presionEstimada
}) => ({
    fechaInicioFuga: formatDateTime(fi, hi),
    fechaSolucionFuga: formatDateTime(fs, hs),
    diametroTuberia,
    presionEstimada
});

const formatVariables4Guardar = ({
    fechaInicioFuga: fi,
    horaInicio: hi,
    fechaSolucionFuga: fs,
    horaSolucion: hs,
    ...restOfData
}) => ({
    ...restOfData,
    fechaInicioFuga: formatDate(fi),
    horaInicio: formatTime(hi),
    fechaSolucionFuga: formatDate(fs),
    horaSolucion: formatTime(hs),
    problemasRelacionados: null
})

export const calcularPerdida = (apollo, formData) => {

    const variables = formatVariables4Perdida(formData);

    return apollo.query({
        query: CALCULAR_PEDRIDA_FUGA,
        fetchPolicy: "network-only",
        variables
    })
        .then(({ data }) => data.operaciones.volumenPerdido);
};

export const guardarFuga = (apollo, formData) => {

    const variables = formatVariables4Guardar(formData);

    return apollo.mutate({
        mutation: REGISTRAR_FUGA,
        fetchPolicy: "no-cache",
        variables
    })
        .then(({ data }) => data.operaciones.registrarFugaEnRed);
}

export const checkFormIsFilled = ({
    gidTuberiaAfectada: gid,
    fechaInicioFuga: fi,
    horaInicio: hi,
    fechaSolucionFuga: fs,
    horaSolucion: hs,
    diametroTuberia,
    presionEstimada
}) => {
    if (!gid) throw new Error('Seleccione una tubería');
    if (!fi) throw new Error('Señale el día en que empezó la fuga');
    if (!hi) throw new Error('Señale la hora a la que empezó la fuga');
    if (!fs) throw new Error('Señale el día en que se controló la fuga');
    if (!hs) throw new Error('Señale la hora a la que se controló la fuga');
    if (!parseInt(diametroTuberia)) throw new Error('Digite el diámetro de la tubería afectada.');
    if (!parseInt(presionEstimada)) throw new Error('Indique la presión estimada en la tubería al momento de la fuga.');
    return true;
}