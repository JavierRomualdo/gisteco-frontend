import React, { useEffect, useState, useCallback } from 'react';
import StreetView from './StreetView';
import { withStore } from '../../../../pages/Mapa/store/Store';
import { Feature } from 'ol';
import { Style, Icon } from 'ol/style';
import locationArrow from './location_arrow.png';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';

const markerStyle = (ft) => {
    const heading = ft.get('heading');
    const rotation = (heading / 360) * 2 * Math.PI;
    return new Style({
        image: new Icon(({
            anchor: [0.5, 0.5],
            src: locationArrow,
            rotation
        }))
    })
}

const createMarker = (map, { heading }) => {
    const ft = new Feature({ heading });
    ft.setStyle(markerStyle);
    map.utils.getSource().addFeature(ft);
    return ft;
}

function updatePositionMarker(pano, marker) {
    const { lng, lat } = pano.getPosition().toJSON();
    const coord = fromLonLat([lng, lat]);
    marker.setGeometry(new Point(coord));
};

const MyStreetView = withStore(({ googleMaps, storeContext: { store, map, streetViewApi } }) => {
    const [marker] = useState(createMarker(map, store.StreetViewPanoramaOptions.pov))
    const [pano, setPano] = useState(null);
    const { StreetViewPanoramaOptions } = store,
        StreetViewWindowIsActive = store.idTabActivo === 'STREET_VIEW' && store.sidebarAbierto;

    const handlePositionChanged = useCallback(() => {
        updatePositionMarker(pano, marker);
    }, [pano, marker]);

    const handlePovChanged = useCallback(() => {
        const pov = pano.getPov();
        marker.set('heading', pov.heading);
    }, [pano, marker]);

    useEffect(() => {
        if (!pano) return;
        if (StreetViewWindowIsActive) {
            pano.addListener('position_changed', handlePositionChanged);
            pano.addListener('pov_changed', handlePovChanged);
            updatePositionMarker(pano, marker);
        }
        return () => {
            if (!pano) return;
            if (StreetViewWindowIsActive) {
                googleMaps.event.clearListeners(pano, 'position_changed');
                googleMaps.event.clearListeners(pano, 'pov_changed');
                marker.setGeometry(null);
            }
        }
    }, [streetViewApi, marker, googleMaps, pano, StreetViewWindowIsActive, handlePositionChanged, handlePovChanged]);

    useEffect(() => {
        if (pano) {
            pano.setOptions(StreetViewPanoramaOptions);
        }
    }, [pano, StreetViewPanoramaOptions]);

    return <StreetView
        googleMaps={googleMaps}
        StreetViewPanoramaOptions={StreetViewPanoramaOptions}
        onReady={pan => setPano(pan)}
    />
})

export default () => {
    const [googleApi, setGoogleApi] = useState(window.google);

    useEffect(() => {
        if (!googleApi) {
            const script = document.querySelector('script[src*="maps.googleapis"]');
            script.onload = function (e) {
                setGoogleApi(window.google);
            }
        }
    }, [googleApi]);

    return !googleApi ? <p>Esperando google maps...</p> : <MyStreetView googleMaps={googleApi.maps} />;

}