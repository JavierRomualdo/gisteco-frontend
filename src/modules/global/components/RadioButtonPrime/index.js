import React from 'react';
import { RadioButton } from 'primereact/radiobutton';

const RadioButtonPrime =  ({inputId, etiqueta, ...otrasPropiedades}) => (
    <div className="form-check form-check-inline">
        <RadioButton {...otrasPropiedades} inputId={inputId}/>
        <label className="p-radiobutton-label" htmlFor={inputId}>{etiqueta}</label>
    </div>
);

export default RadioButtonPrime;