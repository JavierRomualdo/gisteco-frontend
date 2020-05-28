import React from 'react';
import { MultiSelect } from 'primereact/multiselect';

const carTemplate = (option) => (
    <span style={{ fontSize: '1em', float: 'right', marginTop: '4px' }}>{option.label}</span>
);

const selectedCarTemplate = (value) => {
    console.log('selectCarTemplate: ', value);
    if (value) {
        return (
            <div className="my-multiselected-item-token">
                <span>{value}</span>
            </div>
        );
    } else {
        return <span className="my-multiselected-empty-token">Choose</span>
    }
}

const cars = [
    {label: 'Audiooooo', value: 'Audiaaaaaaaaa'},
    {label: 'BMWaaaaa', value: 'BMWeeee'},
    {label: 'Fiat', value: 'Fiat'},
    {label: 'Honda', value: 'Honda'},
    {label: 'Jaguar', value: 'Jaguar'},
    {label: 'Mercedes', value: 'Mercedes'},
    {label: 'Renault', value: 'Renault'},
    {label: 'VW', value: 'VW'},
    {label: 'Volvo', value: 'Volvo'}
];

const MultiSelectPrime = ({ etiqueta, basico, listaOpciones, listaValues, onChange, ...otrasPropiedades }) => (
    <div className="content-section implementation multiselect-demo">
        <label><strong>{etiqueta}</strong></label>
        {
            basico ? <MultiSelect value={listaValues} options={cars} onChange={onChange}
                style={{ minWidth: '12em' }} filter={true} placeholder="Choose" {...otrasPropiedades} /> :
                <MultiSelect value={listaValues} options={cars} onChange={onChange}
                    style={{ minWidth: '12em' }} filter={true} itemTemplate={carTemplate} selectedItemTemplate={selectedCarTemplate}
                    {...otrasPropiedades} />
        }
    </div>
);

export default MultiSelectPrime;
