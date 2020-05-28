import Style from 'easyolmaps/style/Style';
import { Icon, Style as OlStyle } from 'ol/style';
import imgMarker from '../../../../assets/img/marker.png';

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
    fillColor: "#de393e",
    fillOpacity: 0.025,
    stroke: true,
    strokeColor: "#de393e",
    strokeWidth: 3,
    pointRadius: 9
});

export const estiloCapaDibujos = new Style({
    stroke: true,
    strokeColor: '#3d7657',
    strokeWidth: 3
});

export const estiloMarcador = new OlStyle({
    image: new Icon(({
        anchor: [0.5, 0],
        anchorOrigin: 'bottom-left',
        src: imgMarker
    }))
})