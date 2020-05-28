import React, { useState } from 'react';
import { withStore } from '../../../../../pages/Mapa/store/Store';

const VisibilityButton = ({ capa, storeContext: { map } }) => {
    const [visible, setVisible] = useState(map.medidas.getVisible());

    function handleChangeVisibility() {
        //const capa = map.medidas;
        capa.setVisible(!capa.getVisible());
        setVisible(capa.getVisible());
    }

    return (
        <i onClick={handleChangeVisibility} className={visible ? 'fas fa-eye' : 'fas fa-eye-slash'} />
    );
};

export default withStore(VisibilityButton);