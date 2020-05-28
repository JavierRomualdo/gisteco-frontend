import { palette, chartOptions } from "./config"
import moment from 'moment';

const formatLectura = (lectura) => {
    return {
        x: lectura.fecha,
        y: lectura.valor_leido
    }
}

export const formatChartData = (lecturas, variables) => {

    const esConsumo = variables.propiedadFisica === 'consumo',
        esCaudal = variables.propiedadFisica === 'caudal';

    const chartType = esConsumo ? 'bar' : 'scatter',
        unidades_volumen = esCaudal ? variables.unidades.split("/")[0] : '';

    return {
        datasets: lecturas.map((lectura, index) => ({
            label: lectura.id_medidor ?
                `Medidor ${lectura.id_medidor} | ${lectura.tipo_medidor} | V. Total: ${lectura.volumen_total} ${unidades_volumen}` :
                `Datalogger ${lectura.id_datalogger} | ${lectura.variable_control} | V. Total: ${lectura.volumen_total} ${unidades_volumen}`,
            data: lectura.lecturas.map(l => formatLectura(l)),
            borderWidth: 1,
            ...chartOptions[chartType],
            ...palette[index]
        }))
    }
}

export const formatChartOptions = (variables) => {
    return {
        title: {
            display: true,
            text: "Lecturas telemetría"
        },
        tooltips: {
            mode: "index",
            intersect: false
        },
        scales: {
            xAxes: [
                {
                    type: "time",
                    time: {
                        minUnit: variables.propiedadFisica === 'consumo' ? "day" : "minute",
                        displayFormats: {
                            minute: "DD/MM hh:mm a",
                            day: "DD/MM/YYYY"
                        },
                        tooltipFormat: variables.propiedadFisica === 'consumo' ? "DD/MM/YYYY" : "DD/MM/YYYY h:mm:ss a"
                    },
                    barThickness: "flex",
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: "Fecha"
                    }
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: true,
                        labelString: `${variables.propiedadFisica} (${variables.unidades})`
                    }
                }
            ]
        },
        responsive: true,
        maintainAspectRatio: false
    }
}

const formatDate = (date) => moment(date).format('YYYY-MM-DD');

const formatDateTime = (date, timeStr) => {
    const timePart = (moment(timeStr, 'hh:mm a')).format('HH:mm:ss'),
        datePart = formatDate(date);
    return `${datePart} ${timePart}`;
}

export const formatFormData4ChartQuery = (idPuntoControl, formData) => {
    const esConsumo = formData.variable === 'consumo';

    return {
        id: parseInt(idPuntoControl),
        fechaInicio: esConsumo ? formatDate(formData.fechaInicial) : formatDateTime(formData.fechaInicial, formData.horaInicial),
        fechaFin: esConsumo ? formatDate(formData.fechaFinal) : formatDateTime(formData.fechaFinal, formData.horaFinal),
        propiedadFisica: formData.variable,
        unidades: formData.unidades
    }
}

export const initFormData = () => {
    const now = moment(),
        _24hbeforenow = moment().subtract(1, 'days');
    return {
        variable: 'caudal',
        unidades: 'm3/h',
        fechaInicial: _24hbeforenow.toDate(),
        horaInicial: _24hbeforenow.format('hh:mm a'),
        fechaFinal: now.toDate(),
        horaFinal: now.format('hh:mm a')
    }
}