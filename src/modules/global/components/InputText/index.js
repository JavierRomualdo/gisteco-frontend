import React from 'react';

const InputText = ({etiqueta, onChangeInput, textHelp, classHelp,  ...otrasPropiedades}) => (
    <div className="form-group">
        <label><strong>{etiqueta}</strong></label>
        <input type="text" className="form-control form-control-sm" onChange={onChangeInput}
            {...otrasPropiedades} autoComplete="off"/>
        <span id="emailHelp" className={classHelp}>{textHelp}</span>
    </div>
);
export default InputText;