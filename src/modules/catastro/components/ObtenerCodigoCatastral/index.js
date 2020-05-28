import React from 'react';
import { MSJ_NO_HAY_RESULTADOS } from './values';

const ObtenerCodigoCatastral = ({codigoCatastral}) => {
    const {id_distrito, id_manzana, id_provincia, id_sector, lote, sublote} = codigoCatastral;
    return (
        <span>
            {!id_provincia && !id_distrito && !id_sector && !id_manzana && !lote && !sublote && <span>{MSJ_NO_HAY_RESULTADOS}</span>}
            {id_provincia} {id_distrito && ' - '+id_distrito} {id_sector && ' - '+id_sector}
            {id_manzana && ' - '+id_manzana} {lote && ' - '+lote} {sublote && ' - '+sublote}
        </span>
    );
}

export default ObtenerCodigoCatastral;