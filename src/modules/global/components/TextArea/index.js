import React from 'react';

const TextArea = ({etiqueta, onChangeInput, ...otrasPropiedades}) => {
    return (
        <div className="form-group">
            <label><strong>{etiqueta}</strong></label>
            <textarea className="form-control form-control-sm" rows="1" onChange={onChangeInput} {...otrasPropiedades}></textarea>
        </div>
    );
}

export default TextArea;