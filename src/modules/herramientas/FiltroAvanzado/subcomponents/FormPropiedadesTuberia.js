import React from 'react';
import { LABEL_TIPO_MATERIAL, LABEL_TIPO_FUNCION, LABEL_TIPO } from '../values';
import { LISTAR_MATERIAL_TUBERIA, LISTAR_FUNCION_TUBERIA, LISTAR_TIPO_TUBERIA } from '../FATuberiaAgua/queries';
import ListWithQuery from './ListWithQuery';

export default ({ tipo, material, funcion, onChange }) => {

    return (
        <div className="form">
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPO_MATERIAL}</label>
                <ListWithQuery
                    query={LISTAR_MATERIAL_TUBERIA}
                    valuesProperty="operaciones.listaMaterialTuberia"
                    name="material"
                    value={material}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPO_FUNCION}</label>
                <ListWithQuery
                    query={LISTAR_FUNCION_TUBERIA}
                    valuesProperty="operaciones.listaFuncionTuberia"
                    name="funcion"
                    value={funcion}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPO}</label>
                <ListWithQuery
                    query={LISTAR_TIPO_TUBERIA}
                    valuesProperty="operaciones.listaTipoTuberia"
                    name="tipo"
                    value={tipo}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}