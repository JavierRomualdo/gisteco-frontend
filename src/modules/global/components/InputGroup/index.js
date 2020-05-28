import React from 'react';
import { TextInputGroup } from "react-bootstrap4-form-validation";

const InputGroup = (props) => {
    const {label, children, id, ...otrasPropiedades} = props;
    return (
        <div className="form-group">
            <strong>{label && <label htmlFor={id}>{label}</label>}</strong>
            <TextInputGroup id={id} name={id} {...otrasPropiedades}
                prepend={<span className="input-group-text">{children}</span>}
            />
        </div>
    );
}

export default InputGroup;