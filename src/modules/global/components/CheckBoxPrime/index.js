import React from 'react';
import { Checkbox } from 'primereact/checkbox';

const CheckBoxPrime = ({ etiqueta, inputId, ...otrasPropiedades }) => (
    <div>
        <Checkbox {...otrasPropiedades} inputId={inputId} />
        <label className="m-1" htmlFor={inputId}><strong>{etiqueta}</strong></label>
    </div>
);

export default CheckBoxPrime;