
import React from 'react';
import { InputMask } from 'primereact/inputmask';

const InputMaskPrime = ({ etiqueta, ...otrasPropiedades }) => {

    return (
        <div className="p-col-12 p-md-6 col-md-6">
            <label><strong>{etiqueta}</strong></label><br />
            <InputMask {...otrasPropiedades}></InputMask>
        </div>
    );
};
export default InputMaskPrime;