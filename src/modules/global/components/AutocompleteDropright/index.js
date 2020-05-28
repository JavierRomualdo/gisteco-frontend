import React from 'react';
import { AutoComplete } from 'primereact/autocomplete';

const AutocompleteDropright = ({etiqueta, textHelp, classHelp, tipoBusqueda, onChangeTipoBusqueda, ...propiedadesAutoComplete}) => {
    return (
        <div className="p-grid p-fluid">
            <div className="p-col-12">
                <div className="p-inputgroup">
                    <AutoComplete {...propiedadesAutoComplete} required/>
                    <div className="input-group-append">
                        <div className="btn-group">
                            <div className="dropdown">
                                <button type="button" className="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false" title="Opciones de búsqueda" id="dropdownMenu2">
                                    <span className="sr-only">Toggle Dropright</span>
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                    <div className="form-check dropdown-item d-flex justify-content-start">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="filtroNombre" 
                                            checked={tipoBusqueda==='filtroNombre'} onChange={onChangeTipoBusqueda}/>
                                        <label className="form-check-label left-permiso pl-2" htmlFor="exampleRadios1">
                                            Por nombre
                                        </label>
                                    </div>
                                    <div className="form-check dropdown-item d-flex justify-content-start">
                                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="filtroDni"
                                            onChange={onChangeTipoBusqueda} checked={tipoBusqueda==='filtroDni'}/>
                                        <label className="form-check-label left-permiso pl-2" htmlFor="exampleRadios2">
                                            Por dni
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span id="emailHelp" className={classHelp}>{textHelp}</span>
            </div>
        </div>
    );
}

export default AutocompleteDropright;