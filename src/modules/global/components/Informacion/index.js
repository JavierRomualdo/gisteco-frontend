import React from 'react';
import Alert, { TIPO_ALERTA } from '../../../../lib/alerts';
import { MSJ_SELECCIONE_ELEMENTO_MAPA } from './values';
import FeaturesCapa from '../FeaturesCapa';
import { withStore } from '../../../../pages/Mapa/store/Store';
import PanelInfo from './subcomponents/PanelInfo';

const Informacion = ({ storeContext: { map } }) => {

    return (
        <div className='px-3 py-2'>
            <FeaturesCapa
                capa={map.seleccion}
            >
                {([ft]) => {
                    if (ft) {
                        return <PanelInfo feature={ft} />
                    } else {
                        return <Alert tipo={TIPO_ALERTA.INFORMACION}>{MSJ_SELECCIONE_ELEMENTO_MAPA}</Alert>;
                    }
                }}
            </FeaturesCapa>
        </div>

    );
};

export default withStore(Informacion);