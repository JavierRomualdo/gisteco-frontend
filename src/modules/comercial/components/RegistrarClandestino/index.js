import React from 'react';
import { Calendar } from 'primereact/calendar';
import { InputMask } from 'primereact/inputmask';
import MarcadorOL from '../../../global/components/MarcadorOL';
import LabelCoordenadas from '../../../catastro/components/GeoreferenciarUsuario/subcomponents/LabelCoordenas';
import marker from './marker.png';

export default ({ markerInitPos }) => {
    return (
        <div className='p-3'>
            <div className='form mb-4'>
                <h6 className='font-weight-bold'>Datos del responsable</h6>
                <div className='form-row'>
                    <div className="form-group col-sm-12">
                        <label className='font-weight-bold'>Nombre</label>
                        <input type="text" className="form-control form-control-sm" autoFocus={true} />
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group col-sm-6">
                        <label className='font-weight-bold'>DNI</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                </div>
                <h6 className='font-weight-bold'>Datos del predio</h6>
                <div className='form-row'>
                    <div className="form-group col-md-6">
                        <label className='font-weight-bold'>Hab. Urbana</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                    <div className="form-group col-md-6">
                        <label className='font-weight-bold'>Calle</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group col-md-2">
                        <label className='font-weight-bold'>Mz.</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                    <div className="form-group col-md-2">
                        <label className='font-weight-bold'>Lote</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                    <div className="form-group col-md-2">
                        <label className='font-weight-bold'>Nº</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                    <div className="form-group col-md-2">
                        <label className='font-weight-bold'>Piso</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                    <div className="form-group col-md-3">
                        <label className='font-weight-bold'>Apartamento</label>
                        <input type="text" className="form-control form-control-sm" />
                    </div>
                </div>
                <h6 className='font-weight-bold'>Datos de la intervención</h6>
                <div className='form-row'>
                    <div className='form-group col p-fluid'>
                        <label className='font-weight-bold'>Fecha</label>
                        <Calendar
                            inputClassName='form-control-sm'
                            dateFormat="dd/mm/yy" readOnlyInput={true} showIcon={true} />
                    </div>
                    <div className='form-group col'>
                        <label className='font-weight-bold'>Hora</label>
                        <InputMask
                            className='form-control form-control-sm mr-2'
                            mask="99:99 am" placeholder="01:20 PM" slotChar="hh:mm am" />
                    </div>
                </div>
                <h6 className='font-weight-bold'>Datos de la conexión</h6>
                <div className="form-row">
                    <div className="form-group col">
                        <label className='font-weight-bold'>Tipo de servicio</label>
                        <select className='form-control form-control-sm'>
                            <option>AGUA</option>
                            <option>ALCANTARILLADO</option>
                            <option>AGUA Y ALCANTARILLADO</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label className='font-weight-bold'>Categoría</label>
                        <select className='form-control form-control-sm'>
                            <option>DOMÉSTICO 1</option>
                            <option>DOMÉSTICO 2</option>
                            <option>COMERCIAL</option>
                            <option>INDUSTRIAL</option>
                        </select>
                    </div>
                </div>
                <h6 className='font-weight-bold'>Datos para el recupero</h6>
                <div className='form-row'>
                    <div className='form-group col-4'>
                        <label className='font-weight-bold'>Volumen (m3)</label>
                        <input className='form-control form-control-sm' type='number' />
                    </div>
                    <div className='form-group col-4'>
                        <label className='font-weight-bold'>Monto (S/)</label>
                        <input className='form-control form-control-sm' type='number' />
                    </div>
                    <div className='form-group col-4'>
                        <label className='font-weight-bold'>Meses</label>
                        <input className='form-control form-control-sm' type='number' />
                    </div>
                </div>
                <div className='form-group'>
                    <label className='font-weight-bold'>Observaciones</label>
                    <textarea className='form-control fomr-control-sm' />
                </div>
                <div className='form-group'>
                    <MarcadorOL initPosition={markerInitPos} imgMarker={marker} render={coordinate =>
                        <LabelCoordenadas coordinate={coordinate} imgMarker={marker} />}>
                    </MarcadorOL>
                </div>
                <button className='btn btn-primary btn-sm'>
                    <i className='fas fa-save mr-2' />
                    Guardar
                </button>
            </div>
        </div>
    );
}