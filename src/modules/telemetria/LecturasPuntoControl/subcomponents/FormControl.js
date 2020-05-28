import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
import Select from '../../../global/components/Select';
import { measureUnits } from '../config';


const FormControl = forwardRef(({ onSubmit, initialData }, ref) => {

    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        setFormData(prev => ({ ...prev, unidades: measureUnits[formData.variable][0].nombre }))
    }, [formData.variable]);

    useImperativeHandle(ref, () => ({
        getData: () => formData
    }));

    function handleFormInputChange(e) {
        const name = e.target.name,
            value = e.target.value;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div>
            <form className='form-inline' onSubmit={onSubmit}>
                <label className='col-form-label col-form-label-sm mr-2'>Variable</label>
                <select className='form-control form-control-sm mr-2'
                    name='variable'
                    value={formData.variable}
                    onChange={handleFormInputChange}
                    required={true}
                >
                    <option value='caudal'>Caudal</option>
                    <option value='presión'>Presión</option>
                    <option value='nivel'>Nivel</option>
                    <option value='consumo'>Consumo</option>
                </select>
                <label className='col-form-label col-form-label-sm mr-2'>Unidades</label>
                <Select
                    className='form-control form-control-sm mr-2'
                    name='unidades'
                    lista={measureUnits[formData.variable]}
                    value={formData.unidades}
                    onChange={handleFormInputChange}
                    required={true}
                />
                <label className='col-form-label col-form-label-sm mr-2'>Fecha inicial</label>
                <Calendar
                    name='fechaInicial'
                    style={{ width: '154px' }}
                    inputStyle={{ width: '120px' }}
                    inputClassName='form-control form-control-sm'
                    className='mr-2'
                    dateFormat="dd/mm/yy"
                    readOnlyInput={true}
                    showIcon={true}
                    value={formData.fechaInicial}
                    onChange={handleFormInputChange}
                    required={true}
                />
                <label className='col-form-label col-form-label-sm mr-2'>Hora inicial</label>
                <InputMask
                    name='horaInicial'
                    className='form-control form-control-sm mr-2'
                    style={{ width: '100px' }}
                    mask="99:99 am"
                    slotChar="hh:mm am"
                    value={formData.horaInicial}
                    onChange={handleFormInputChange}
                    required={true}
                />
                <label className='col-form-label col-form-label-sm mr-2'>Fecha final</label>
                <Calendar
                    name='fechaFinal'
                    style={{ width: '154px' }}
                    inputStyle={{ width: '120px' }}
                    maxDate={new Date()}
                    inputClassName='form-control form-control-sm'
                    className='mr-2'
                    dateFormat="dd/mm/yy"
                    readOnlyInput={true}
                    showIcon={true}
                    value={formData.fechaFinal}
                    onChange={handleFormInputChange}
                    required={true}
                />
                <label className='col-form-label col-form-label-sm mr-2'>Hora final</label>
                <InputMask
                    name='horaFinal'
                    className='form-control form-control-sm mr-2'
                    style={{ width: '100px' }}
                    mask="99:99 am"
                    slotChar="hh:mm am"
                    value={formData.horaFinal}
                    onChange={handleFormInputChange}
                    required={true}
                />
                <button type='submit' className='btn btn-primary btn-sm'>Consultar</button>
            </form>
        </div>
    );
})

export default FormControl;