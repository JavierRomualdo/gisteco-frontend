import React from 'react';
import { LABEL_TIPO_MATERIAL, LABEL_TIPO } from '../values';
import ListWithQuery from './ListWithQuery';
import { LISTAR_MATERIAL_TUBERIA_ALCANTARILLADO, LISTAR_TIPO_TUBERIA_ALCANTARILLADO } from '../FATuberiaAlcantarillado/queries';

export default ({ tipo, material, onChange }) => {
    return (
        <div className="form">
            <div className="form-group">
                <label className="font-weight-bold">{LABEL_TIPO_MATERIAL}</label>
                <ListWithQuery
                    query={LISTAR_MATERIAL_TUBERIA_ALCANTARILLADO}
                    valuesProperty="operaciones.listaMaterialTuberiaAlcantadillado"
                    name="material"
                    value={material}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className="font-weight-bold">{LABEL_TIPO}</label>
                <ListWithQuery
                    query={LISTAR_TIPO_TUBERIA_ALCANTARILLADO}
                    valuesProperty="operaciones.listaTipoTuberiaAlcantarillado"
                    name="tipo"
                    value={tipo}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}