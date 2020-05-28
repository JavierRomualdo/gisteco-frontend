import React from 'react';
import { LABEL_TIPOLOGIA, LABEL_DETALLE_PROBLEMA, LABEL_TIPO_PROBLEMA_ALCANCE } from '../values';
import { LISTAR_TIPOLOGIA_PROBLEMAS, LISTAR_DETALLE_PROBLEMAS_DE_TIPOLOGIA, LISTA_TIPO_PROBLEMAS } from '../FAProblemas/queries';
import AutocompleteWithQuery from './AutocompleteWithQuery';

export default ({ tipologia, detalle, alcance, onChange, area }) => {

    const idsTipologia = tipologia.map(t => t.id);

    return (
        <div className="form">
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPOLOGIA}</label>
                <AutocompleteWithQuery
                    query={LISTAR_TIPOLOGIA_PROBLEMAS}
                    variables={{ area }}
                    valuesProperty="operaciones.listaTipologiaProblema"
                    name="tipologia"
                    value={tipologia}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_DETALLE_PROBLEMA}</label>
                <AutocompleteWithQuery
                    query={LISTAR_DETALLE_PROBLEMAS_DE_TIPOLOGIA}
                    variables={{ area, idsTipologia }}
                    valuesProperty="operaciones.listaDetalleProblema"
                    name="detalle"
                    value={detalle}
                    onChange={onChange}
                />
            </div>
            <div className="form-group">
                <label className='font-weight-bold'>{LABEL_TIPO_PROBLEMA_ALCANCE}</label>
                <AutocompleteWithQuery
                    query={LISTA_TIPO_PROBLEMAS}
                    valuesProperty="operaciones.listaTipoProblema"
                    name="alcance"
                    value={alcance}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}