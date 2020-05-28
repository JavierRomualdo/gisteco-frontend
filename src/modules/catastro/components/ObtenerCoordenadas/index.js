import React from 'react';
import { toLonLat } from 'ol/proj';

const ObtenerCoordenadas = ({ coordinate }) => {
    const lonlat = toLonLat(coordinate);
    const [x, y] = lonlat.map(c => c.toFixed(8));
    return (
        <a target='_blank' href={`http://www.google.com/maps/place/${y},${x}`} rel="noopener noreferrer">{x}, {y}</a>
    );
}

export default ObtenerCoordenadas;