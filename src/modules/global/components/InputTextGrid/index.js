import React from 'react';
import { InputText } from 'primereact/inputtext';

const InputTextGrid = ({ etiqueta, onChangeInput, ...otrasPropiedades }) => (
    <div className="col-md-6 p-0">
        <label><strong>{etiqueta}</strong></label>
        <InputText type="text" keyfilter="pint" onChange={onChangeInput} {...otrasPropiedades} />
    </div>
);
export default InputTextGrid;