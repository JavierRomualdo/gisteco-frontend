import React from 'react';
import { Spinner } from 'primereact/spinner';

const SpinnerPrime = ({ onSpinnerChange, etiqueta, inputId, ...otrasPropiedades }) => (
    <div className="form-group">
        <label htmlFor={inputId}><strong>{etiqueta}</strong></label>
        <Spinner onChange={onSpinnerChange} inputId={inputId} {...otrasPropiedades} />
    </div>
);

export default SpinnerPrime;