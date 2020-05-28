import React from 'react';
//import TabComponentContainer from '../TabComponentContainer';
import LeyendaCapa from './subcomponents/LeyendaCapa';
import { withStore } from '../../../../pages/Mapa/store/Store';
import GeoserverLayer from 'easyolmaps/layer/GeoserverLayer';

const LeyendaMapa = ({ storeContext: { map } }) => {

    const capasVisibles = map.getLayers().getArray().filter(capa => capa.getVisible() && capa instanceof GeoserverLayer);

    return (
        <div className="p-2">
            {capasVisibles.map((capa, index) => <LeyendaCapa key={index} capa={capa} />)}
        </div>
    )
}

export default withStore(LeyendaMapa);
