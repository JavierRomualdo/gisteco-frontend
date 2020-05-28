import Polygon from 'ol/geom/Polygon';
import LineString from 'ol/geom/LineString';

export const convertirMetrosAKilometros = (distancia) => {
    return parseFloat((distancia / 1000).toFixed(2));
}

export const formatearDistancia = (distancia) => {
    if (distancia > 1000) {
        return `${convertirMetrosAKilometros(distancia)} km`;
    }
    return `${distancia.toFixed(2)} m`;
}

export const convertirMetrosAKilometrosm2 = (distancia) => {
    return parseFloat((distancia / 1000000).toFixed(2));
}

export const formatearArea = (distancia) => {
    if (distancia > 10000) {
        return `${convertirMetrosAKilometrosm2(distancia)} km2`;
    }
    return `${distancia.toFixed(2)} m2`;
}

export const getMeasure = (ft) => {
    const geom = ft.getGeometry();
    if (geom instanceof Polygon) return `${formatearArea(geom.getArea())}`;
    else if (geom instanceof LineString) return `${formatearDistancia(geom.getLength())}`;
    else throw new Error('Tipo de geometría incorrecto');
}

export const formatFeatures = (fts) => {
    return fts.map((ft, id) => {
        let icon = '', medida = '', medicion = {};
        const geom = ft.getGeometry();
        if (geom instanceof Polygon) {
            icon = 'fas fa-draw-polygon';
            medicion = { valor: geom.getArea().toFixed(2), unidad: 'm2' };
            medida = `Área: ${formatearArea(geom.getArea())}`;
        }
        else if (geom instanceof LineString) {
            icon = 'fas fa-slash';
            medicion = { valor: geom.getLength().toFixed(2), unidad: 'm' };
            medida = `Distancia: ${formatearDistancia(geom.getLength())}`;
        }
        return { id, medida, icon, medicion, ft };
    });
}