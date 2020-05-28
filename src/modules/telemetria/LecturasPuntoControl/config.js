export const palette = [{
    backgroundColor: "rgba(171,30,205,0.15)",
    borderColor: "rgba(171,30,205,1)"
}, {
    backgroundColor: "rgba(30,126,205,0.15)",
    borderColor: "rgba(30,126,205,1)"
}, {
    backgroundColor: "rgba(183,23,23,0.15)",
    borderColor: "rgba(183,23,23,1)"
}];

export const chartOptions = {
    scatter: {
        lineTension: 0.1,
        pointHoverRadius: 5,
        pointRadius: 3,
        showLine: true,
        spanGaps: false
    }
};

export const measureUnits = {
    caudal: [{ nombre: 'm3/h' }, { nombre: 'lt/h' }],
    'presión': [{ nombre: 'mca' }],
    nivel: [{ nombre: 'm' }],
    consumo: [{ nombre: 'm3' }, { nombre: 'lt' }]
}

/* valores para TablaLecturas */

export const columnDefs = [
    {
        headerName: "Fecha",
        field: "fecha",
        sortable: true
    },
    {
        headerName: "Lectura",
        field: "valor_leido"
    }
];