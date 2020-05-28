import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ContextMenu } from 'primereact/contextmenu';
import { crearMenuContextual } from './config';
import { useApolloClient } from 'react-apollo-hooks';
import { withStore } from '../../../../pages/Mapa/store/Store';
import { useAbility } from '../../../../pages/Mapa/casl/ability';

const FullCanvas = styled.div`
    width: 100%;
    height: 100%;
`;

const MapCanvas = styled.div`
    width: 100%;
    height: 100%;
`;


export default withStore(({ storeContext }) => {
    const [menuContextual, setMenuContextual] = useState([]);
    const apollo = useApolloClient();
    const ability = useAbility();
    const mapRef = useRef(null);
    const cm = useRef(null);

    useEffect(() => {
        storeContext.map.setTarget(mapRef.current);
    }, [storeContext.map]);

    return (
        <FullCanvas>
            <ContextMenu
                id="mapContextMenu"
                ref={cm}
                model={menuContextual}
                appendTo={document.getElementsByTagName('body')[0]}
            />
            <MapCanvas
                id='mapa'
                ref={mapRef}
                onContextMenu={(e) => {
                    e.preventDefault();
                    setMenuContextual(crearMenuContextual(e, storeContext, apollo, ability));
                    cm.current.show(e);
                }}
            />
        </FullCanvas>
    );
});