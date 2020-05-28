import { CALCULAR_PERDIDA_FUGA } from './queries';
import { REGISTRAR_FUGA } from './mutations';
import moment from 'moment';

const formatDate = (d) => moment(d).format('YYYY-MM-DD');
const formatTime = (tStr) => (moment(tStr, 'hh:mm a')).format('HH:mm:ss');
const formatDateTime = (d, tStr) => `${formatDate(d)} ${formatTime(tStr)} `;

const formatVariables4Perdida = ({
    fechaInicio: fi,
    horaInicio: hi,
    fechaSolucion: fs,
    horaSolucion: hs,
    diametroTuberia
}) => ({
    fechaInicio: formatDateTime(fi, hi),
    fechaSolucion: formatDateTime(fs, hs),
    diametroTuberia
});

const formatVariables4Guardar = ({
    fechaInicio: fi,
    horaInicio: hi,
    fechaSolucion: fs,
    horaSolucion: hs,
    ...restOfData
}) => ({
    ...restOfData,
    fechaInicio: formatDate(fi),
    horaInicio: formatTime(hi),
    fechaSolucion: formatDate(fs),
    horaSolucion: formatTime(hs),
    problemasRelacionados: null
})

export const calcularPerdida = (apollo, formData) => {

    const variables = formatVariables4Perdida(formData);

    return apollo.query({
        query: CALCULAR_PERDIDA_FUGA,
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
        .then(({ data }) => {
            return data.operaciones.registrado
        });
}