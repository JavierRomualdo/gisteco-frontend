import React, { useState } from 'react';
import { LABEL_TIPO_GEOMETRIA } from '../values';

const SelectOptionIcon = ({listaTipoMediciones, tipoMedicionSeleccionado, onChangeTipoMedicion, disabled}) => {
    const [idTipoMedicionSeleccionado] = useState();

    return <div className="col-md-12 mb-3">
        <label htmlFor="validationTooltipUsername"><strong>{LABEL_TIPO_GEOMETRIA}</strong></label>
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text" id="validationTooltipUsernamePrepend" title={tipoMedicionSeleccionado.title}>
                    <i className={tipoMedicionSeleccionado.icon}></i>
                </span>
            </div>
            <select className="form-control" onChange={onChangeTipoMedicion} value={idTipoMedicionSeleccionado} disabled={disabled}>
                {
                    listaTipoMediciones.map((item) => (
                        <option key={item.id} value={item.id}>{item.nombre}</option>
                    ))
                }
            </select>
        </div>
    </div>
}

export default SelectOptionIcon;