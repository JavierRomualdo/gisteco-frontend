import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { getUsuarios } from './util';
import { useApolloClient } from 'react-apollo-hooks';

const Radio = ({ id, children, ...restProps }) => {
    return (
        <div className="form-check dropdown-item d-flex justify-content-start">
            <input
                className="form-check-input"
                type="radio"
                id={id}
                {...restProps}
            />
            <label className="form-check-label left-permiso pl-2" htmlFor={id}>
                {children}
            </label>
        </div>
    );
}

const AutoCompleteUsuarios = ({ autoFocus, onChange, value, ...props }, ref) => {

    const [inputText, setInputText] = useState(value);
    const [metodoBusqueda, setMetodoBusqueda] = useState('0');
    const [sugerencias, setSugerencias] = useState([]);
    const apollo = useApolloClient();
    const { inputId } = props;

    useEffect(() => {
        const input = document.getElementById(inputId);
        if (autoFocus && inputId) input.focus();
    }, [autoFocus, inputId]);

    useImperativeHandle(ref, () => ({
        clearInput: () => setInputText('')
    }));

    function handleCompleteMethod(e) {
        const variables = metodoBusqueda === '0' ? { filtroNombre: e.query } : { filtroDni: e.query };
        getUsuarios(apollo, variables)
            .then(usuarios => setSugerencias(usuarios))
            .catch(error => {
                setSugerencias([]);
                console.log(error.message);
            });
    }

    function handleRadioChange(e) {
        setMetodoBusqueda(e.target.value);
    }

    const placeholder = metodoBusqueda === '0' ? 'Escriba el nombre del usuario' : 'Dígite el DNI del usuario';

    return (
        <div className="input-group d-flex">
            <AutoComplete
                className="flex-grow-1"
                inputClassName='form-control form-control-sm'
                suggestions={sugerencias}
                completeMethod={handleCompleteMethod}
                field="nombre_completo"
                placeholder={placeholder}
                value={inputText}
                onChange={e => {
                    setInputText(e.value);
                    onChange && onChange.call(null, e);
                }}
                {...props}
            />
            <div className="input-group-append">
                <div className="btn-group">
                    <div className="dropdown">
                        <button type="button" className="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false" title="Opciones de búsqueda" id="dropdownACUsuarios">
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownACUsuarios">
                            <Radio
                                id="acurb1"
                                checked={metodoBusqueda === '0'}
                                name='metodoBusqueda'
                                value='0'
                                onChange={handleRadioChange}
                            >
                                Por nombre
                                    </Radio>
                            <Radio
                                id="acurb2"
                                checked={metodoBusqueda === '1'}
                                name='metodoBusqueda'
                                value='1'
                                onChange={handleRadioChange}
                            >
                                Por DNI
                                    </Radio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default forwardRef(AutoCompleteUsuarios);