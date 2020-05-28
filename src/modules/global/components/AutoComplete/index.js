import React from 'react';
import { AutoComplete } from 'primereact/autocomplete';

const AutoCompleteInput = ({etiqueta, textHelp, classHelp, ...propiedadesAutoComplete}) => {
    return (
        <div className="form-group content-section implementation">
            <span className="p-fluid">
                <label className="mr-2 font-weight-bold">{etiqueta}</label>
                <AutoComplete {...propiedadesAutoComplete} required/>
                <span id="emailHelp" className={classHelp}>{textHelp}</span>
            </span>
        </div>
    );
}

export default AutoCompleteInput;