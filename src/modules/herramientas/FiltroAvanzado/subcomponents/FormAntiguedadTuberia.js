import React from 'react';
import { LABEL_FILTRAR_POR_INTERVALO, LABEL_ANIOS_ANTIGUEDAD } from '../values';
import { Spinner } from 'primereact/spinner';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';

export default ({ aniosAntiguedad, anioInicial, anioFinal, filtrarPorIntervalo, onChange }) => {

    return (
        <div>
            <div className="form-inline">
                <label className="font-weight-bold">{LABEL_ANIOS_ANTIGUEDAD}</label>
                <Spinner
                    inputClassName="form-control form-control-sm"
                    className="ml-2"
                    name="aniosAntiguedad"
                    value={aniosAntiguedad}
                    onChange={onChange}
                />
            </div>
            <div className='my-2'>
                <Checkbox
                    inputId="facb1"
                    name="filtrarPorIntervalo"
                    checked={filtrarPorIntervalo}
                    onChange={onChange}
                />
                <label htmlFor="facb1" className="p-checkbox-label">{LABEL_FILTRAR_POR_INTERVALO}</label>
            </div>
            <div className="form">
                <div className="form-row">
                    <div className="form-group col-6">
                        <label className="font-weight-bold">Desde</label>
                        <InputText
                            keyfilter="pint"
                            className="form-control form-control-sm"
                            maxLength={4}
                            name="anioInicial"
                            value={anioInicial}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label className="font-weight-bold">Hasta</label>
                        <InputText
                            keyfilter="pint"
                            className="form-control form-control-sm"
                            maxLength={4}
                            name="anioFinal"
                            value={anioFinal}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}