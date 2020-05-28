import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Modify from 'ol/interaction/Modify';
import { estiloMoverMarcador } from './estilos';
import Collection from 'ol/Collection';
import { withStore } from '../../../../pages/Mapa/store/Store';
import { toLonLat } from 'ol/proj';

const formatCoordinate = (coordinate) => toLonLat(coordinate).map(coord => parseFloat(coord.toFixed(6)));

const createMarker = (position, imgMarker) => {
	const feature = new Feature({
		geometry: new Point(position)
	});

	const iconStyle = new Style({
		image: new Icon(({
			anchor: [0.5, 0],
			anchorOrigin: 'bottom-left',
			src: imgMarker
		}))
	});

	feature.setStyle(iconStyle);

	return feature;
};

const initPositionChanged = (feature, position) => {
	feature.getGeometry().setCoordinates(position);
}

const MarcadorOL = forwardRef(({ initPosition, imgMarker, render, storeContext: { map } }, ref) => {

	const [position, setPosition] = useState(initPosition);
	const [feature] = useState(createMarker(position, imgMarker));

	const handleChangePosition = useCallback((e) => {
		setPosition(e.target.getCoordinates())
	}, []);

	useEffect(() => {
		map.utils.getSource().addFeature(feature);
		feature.getGeometry().on('change', handleChangePosition);
		const modifyInteraction = new Modify({
			features: new Collection([feature]),
			style: estiloMoverMarcador
		});
		map.addInteraction(modifyInteraction);

		return () => {
			feature.getGeometry().un('change', handleChangePosition);
			map.utils.getSource().removeFeature(feature);
			map.removeInteraction(modifyInteraction);
		}
	}, [map, feature, handleChangePosition]);

	useEffect(() => {
		initPositionChanged(feature, initPosition);
	}, [feature, initPosition]);

	useImperativeHandle(ref, () => ({
		getCoordinate: () => formatCoordinate(feature.getGeometry().getCoordinates())
	}))

	return render(formatCoordinate(position));
});

export default withStore(MarcadorOL);