import moment from 'moment';
import { LISTA_FUGAS } from './queries';

const formatData = ({
    idProvincia,
    idDistrito,
    fechaInicial,
    fechaFinal
}) => {

    const idProv = parseInt(idProvincia),
        idDist = parseInt(idDistrito);

    return {
        idProvincia: idProv ? idProv : null,
        idDistrito: idDist ? [idDist] : null,
        fechaInicial: moment(fechaInicial).format('YYYY-MM-DD'),
        fechaFinal: moment(fechaFinal).format('YYYY-MM-DD')
    }
}

export const getListaFugas = (apollo, formData) => {

    const variables = formatData(formData);    

    return apollo.query({
        query: LISTA_FUGAS,
        variables,
        fetchPolicy: "network-only"
    }).then(({ data }) => data.operaciones.fugasAnf)

}