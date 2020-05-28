import React from 'react';

const SelectOption = ({etiqueta, lista, onChangeSelect,value, ...otrasPropiedades}) => {
    return (
        <div className="form-group">
            <label><strong>{etiqueta}</strong></label>
            <select className="form-control" onChange={onChangeSelect} value={value} {...otrasPropiedades}>
                {
                    lista.map(({ id, nombre }, index) => (
                        <option key={index} value={id || nombre}>{nombre}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default SelectOption;