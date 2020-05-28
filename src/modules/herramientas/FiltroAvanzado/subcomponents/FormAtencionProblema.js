import React from 'react';
import { LABEL_ESTADO_ATENCION, LABEL_PLAZO_ATENCION } from '../values';
import { RadioButton } from 'primereact/radiobutton';
import Calendar from '../../../global/components/Calendar';

export default ({ atendido, enElPlazo, periodoRegistroFechaInf, periodoRegistroFechaSup, onChange }) => {

    return (
        <div className="form">
            <div className="form-group">
                <label className="font-weight-bold">{LABEL_ESTADO_ATENCION}</label>
                <div>
                    <div className="form-check form-check-inline">
                        <RadioButton
                            name='atendido'
                            value={true}
                            inputId="faprb11"
                            checked={atendido === true}
                            onChange={onChange}
                        />
                        <label className='p-radiobutton-label' htmlFor="faprb11">Atendido</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <RadioButton
                            name='atendido'
                            value={false}
                            inputId="faprb12"
                            checked={atendido === false}
                            onChange={onChange}
                        />
                        <label className='p-radiobutton-label' htmlFor="faprb12">Pendiente</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <RadioButton
                            name='atendido'
                            value={null}
                            inputId="faprb13"
                            checked={atendido === null}
                            onChange={onChange}
                        />
                        <label className='p-radiobutton-label' htmlFor="faprb13">Todos</label>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label className="font-weight-bold">{LABEL_PLAZO_ATENCION}</label>
                <div>
                    <div className="form-check form-check-inline">
                        <RadioButton
                            inputId="faprb21"
                            name='enElPlazo'
                            value={true}
                            checked={enElPlazo === true}
                            onChange={onChange}
                        />
                        <label className='p-radiobutton-label' htmlFor="faprb21">En el plazo</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <RadioButton
                            inputId="faprb22"
                            name='enElPlazo'
                            value={false}
                            checked={enElPlazo === false}
                            onChange={onChange}
                        />
                        <label className='p-radiobutton-label' htmlFor="faprb22">Vencido</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <RadioButton
                            inputId="faprb23"
                            name='enElPlazo'
                            value={null}
                            checked={enElPlazo === null}
                            onChange={onChange}
                        />
                        <label className='p-radiobutton-label' htmlFor="faprb23">Todos</label>
                    </div>
                </div>
            </div>
            <label className="font-weight-bold">Fecha de registro</label>
            <div className="form-row">
                <div className="form-group col-6">
                    <label className="font-weight-bold">Entre</label>
                    <Calendar
                        name="periodoRegistroFechaInf"
                        value={periodoRegistroFechaInf}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group col-6">
                    <label className="font-weight-bold">Hasta</label>
                    <Calendar
                        name="periodoRegistroFechaSup"
                        value={periodoRegistroFechaSup}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}