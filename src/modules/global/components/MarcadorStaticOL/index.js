import React, { useState, useEffect } from 'react';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import { estiloMarcadorStatico } from './estilos';
import { withStore } from '../../../../pages/Mapa/store/Store'

const createMarker = (map, position) => {
	const feature = new Feature({
		geometry: new Point(position)
	});

	feature.setStyle(estiloMarcadorStatico);
	map.marcadores.getSource().addFeature(feature);

	return feature;
};

const MarcadorStaticOL = ({ position, storeContext: { map } }) => {
	const [feature] = useState(() => createMarker(map, position));

	useEffect(() => {
		return () => {
			map.marcadores.getSource().removeFeature(feature);
		}
	}, [map, feature]);

	useEffect(() => {
		feature.getGeometry().setCoordinates(position);
	}, [feature, position]);

	return <div />;
}

export default withStore(MarcadorStaticOL);