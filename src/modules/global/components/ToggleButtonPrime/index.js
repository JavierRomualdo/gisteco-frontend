
import React from 'react';
import {ToggleButton} from 'primereact/togglebutton';

const ToggleButtonPrime = ({ckeckMedicion, onClickAccionMedicion, etiqueta, ...otrasPropiedades}) => (
    <div className="form-group">
        <label><strong>{etiqueta}</strong></label>
        <ToggleButton {...otrasPropiedades} checked={ckeckMedicion} onChange={onClickAccionMedicion}/>
    </div>
);
export default ToggleButtonPrime;