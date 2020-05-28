import React, { forwardRef } from 'react';

const Select = forwardRef(({ lista, valueFieldName = "id", nameFieldName = "nombre", ...otrasPropiedades }, ref) => {
    return (
        <select ref={ref} {...otrasPropiedades}>
            {
                lista.map((el, index) => (
                    <option key={index} value={el[valueFieldName] || el[nameFieldName]}>{el[nameFieldName]}</option>
                ))
            }
        </select>
    );
})

export default Select;