import React, { useEffect, useState, useRef } from 'react';
import { withStore } from '../../../../pages/Mapa/store/Store';

export default withStore(({
    googleMaps,
    onReady,
    StreetViewPanoramaOptions,
    storeContext: { store }
}) => {
    const [panorama, setPanorama] = useState(null);
    const ref = useRef(null);
    const { sidebarAbierto, idTabActivo } = store,
        open = sidebarAbierto && idTabActivo === 'STREET_VIEW';

    useEffect(() => {
        if (open) {
            googleMaps.event.trigger(panorama, 'resize');
        }
    }, [googleMaps, panorama, open]);

    useEffect(() => {
        if (!panorama) {
            const pano = new googleMaps.StreetViewPanorama(ref.current, StreetViewPanoramaOptions);
            setPanorama(pano);
            onReady && onReady.call(null, pano);
        }
    }, [googleMaps, panorama, onReady, StreetViewPanoramaOptions]);


    return <div ref={ref} style={{ width: '100%', height: '100%' }} />
})