import React from 'react';
import { InputSwitch } from 'primereact/inputswitch';

const InputSwitchPrime = ({ etiqueta, inputId, ...otrasPropiedades }) => (
    <div>
        <label className="mb-2 mr-sm-2" htmlFor={inputId}><strong>{etiqueta}</strong></label>
        <InputSwitch {...otrasPropiedades} inputId={inputId} className="card-header-actions" />
    </div>
);

export default InputSwitchPrime;