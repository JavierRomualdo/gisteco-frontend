import React from 'react';
import { SelectGroup } from 'react-bootstrap4-form-validation';

const SelectOptionGroup = (props) => {
    const {label, children, id, lista, ...otrasPropiedades} = props;
    return (
        <div className="form-group">
            <strong><label htmlFor={id}>{label}</label></strong>
            <SelectGroup name="color" id={id} {...otrasPropiedades}>
                <option value="">--- Por favor seleccione ---</option>
                {
                    lista.map((item) => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))
                }
            </SelectGroup>
        </div>
    );
}

export default SelectOptionGroup;