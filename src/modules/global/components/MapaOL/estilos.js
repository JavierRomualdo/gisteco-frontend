import Style from 'easyolmaps/style/Style';

export const estiloDibujoMedicion = (ft) => {
    const label = ft.get('measure');
    return new Style({
        stroke: true,
        strokeColor: "#0000ff",
        strokeWidth: 2,
        pointRadius: 6,
        label,
        labelAlign: 'center'
    });
}

const buildEstiloFeature = (strong, label) => {
    return new Style({
        fill: true,
        fillColor: "#ff0000",
        fillOpacity: 0.2,
        stroke: true,
        strokeColor: strong ? "#ff0000" : "#ec7019",
        strokeWidth: strong ? 3 : 2,
        label,
        labelAlign: 'center'
    });
}

export const estiloFeatureMedicion = (ft) => {
    return buildEstiloFeature(ft.get('strong'), ft.get('measure'));
}

export const estiloFeatureSeleccionado = new Style({
    fill: true,
    fillColor: "#d7df01",
    fillOpacity: 0.2,
    stroke: true,
    strokeColor: "#ff0000",
    strokeWidth: 3,
    pointRadius: 9
});

export const estiloCapaDibujos = new Style({
    stroke: true,
    strokeColor: '#3d7657',
    strokeWidth: 3
});