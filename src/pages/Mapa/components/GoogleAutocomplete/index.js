import React, { useEffect, useRef, useState, forwardRef } from 'react';
import asyncLoading from 'react-async-loader';
import { withStore } from '../../store/Store';
import { transformExtent, fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';
import { estiloMarcador } from '../../store/map/estilos';
import { Feature } from 'ol';

const Input = forwardRef((props, ref) =>
    <div className="form-inline my-1 my-lg-0 search">
        <input
            ref={ref}
            id="googleAutocompleteWdgt"
            placeholder='Ingrese una ubicación'
            style={{ width: '280px' }}
            className="form-control form-control-sm mr-sm-2 rounded search-input"
            type="text"
            {...props}
        />
    </div>);

const crearMarcador = (map) => {
    const ft = new Feature();
    ft.setStyle(estiloMarcador);
    map.utils.getSource().addFeature(ft);
    return ft;
}

const GooglePlacesAutocomplete = withStore(({ googleMaps, storeContext: { map } }) => {
    const [marker] = useState(crearMarcador(map));
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const googlePlaces = googleMaps.places;

    useEffect(() => {
        const bounds = new googleMaps.LatLngBounds(
            new googleMaps.LatLng(-6.410837, -81.458130),
            new googleMaps.LatLng(-4.023179, -79.170227)
        );

        const pac = new googlePlaces.Autocomplete(inputRef.current, { bounds, strictBounds: true });
        pac.setFields(['geometry']);
        pac.addListener('place_changed', function () {
            const place = pac.getPlace();
            if (!place.geometry) return;

            const { location, viewport } = place.geometry;
            const { lng, lat } = location.toJSON();

            const ne = viewport.getNorthEast();
            const sw = viewport.getSouthWest();
            const extent = [sw.lng(), sw.lat(), ne.lng(), ne.lat()];

            const localExtent = transformExtent(extent, 'EPSG:4326', map.codeProjection);
            const placeCoordinate = fromLonLat([lng, lat]);
            map.volarHastaExtension(localExtent);
            marker.setGeometry(new Point(placeCoordinate))
        });

    }, [map, marker, googleMaps, googlePlaces]);

    return (
        <Input ref={inputRef} value={inputText} onChange={(e) => {
            const value = e.target.value;
            if (!value) marker.setGeometry(null);
            setInputText(value);
        }} />
    );
});

const AutocompleteLoader = ({ googleMaps }) => {
    if (!googleMaps) return <Input disabled={true} />
    return <GooglePlacesAutocomplete googleMaps={googleMaps} />
}

const mapScriptsToProps = () => ({
    googleMaps: {
        globalPath: 'google.maps',
        url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAecccog4G_o-W9EdopUQU1CZJhU8HQSOU&signed_in=true&libraries=places'
    }
});

export default asyncLoading(mapScriptsToProps)(AutocompleteLoader);