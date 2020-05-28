import React from 'react';
import Calendar from '../../../global/components/Calendar';
import { Checkbox } from 'primereact/checkbox';

export default ({ periodoGeorefFechaInf, periodoGeorefFechaSup, georeferenciadoXGIS, onChange }) => {

    return (
        <div>
            <label className="font-weight-bold">Fecha de georeferenciación</label>
            <div className="form">
                <div className="form-row">
                    <div className="form-group col-6">
                        <label className="font-weight-bold">Entre</label>
                        <Calendar
                            name="periodoGeorefFechaInf"
                            value={periodoGeorefFechaInf}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group col-6">
                        <label className="font-weight-bold">Hasta</label>
                        <Calendar
                            name="periodoGeorefFechaSup"
                            value={periodoGeorefFechaSup}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
            <div className='my-2'>
                <Checkbox
                    inputId="faucb1"
                    name="georeferenciadoXGIS"
                    checked={georeferenciadoXGIS}
                    onChange={onChange}
                />
                <label htmlFor="faucb1" className="p-checkbox-label">Georeferenciado con GIS</label>
            </div>
        </div>
    );
}