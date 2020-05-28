const palette = [{
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
    title: {
        display: true,
        text: "Consumos"
    },
    tooltips: {
        mode: "index",
        intersect: false
    },
    scales: {
        xAxes: [
            {
                type: "category",
                scaleLabel: {
                    display: true,
                    labelString: "Mes"
                }
            }
        ],
        yAxes: [
            {
                scaleLabel: {
                    display: true,
                    labelString: "m3"
                },
                ticks: {
                    min: 0
                }
            }
        ]
    },
    responsive: true,
    maintainAspectRatio: false
}

export const formatChartData = (consumos) => {

    const labels = consumos.map(c => c.periodo);
    const mapConsumos = [
        {
            label: 'Consumo facturado',
            field: "consumo_agua_facturable"
        },
        {
            label: 'Consumo real',
            field: "consumo_agua_real"
        }
    ];
    const datasets = mapConsumos.map(({ label, field }, index) => {
        return {
            label,
            fill: false,
            lineTension: 0.1,
            pointRadius: 4,
            pointHoverRadius: 5,
            ...palette[index],
            data: consumos.map(c => c[field])
        }
    });

    return { labels, datasets };
}