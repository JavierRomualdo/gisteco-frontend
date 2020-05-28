import WKT from 'ol/format/WKT';

export const writeFilter = (relacionEspacial, dibujo) => {
    const fmt = new WKT();
    const wkt = fmt.writeGeometry(dibujo.getGeometry(), { featureProjection: 'EPSG:3857', dataProjection: 'EPSG:32717' });
    return `${relacionEspacial}(geom,${wkt})`;
};