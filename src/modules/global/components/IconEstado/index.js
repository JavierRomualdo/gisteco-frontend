import React from 'react';
import { LoadingIcon, CheckIcon, ErrorIcon, CheckDouble, CloudIcon } from '../../../../lib/icons';
import { ESTADO_CARGANDO, ESTADO_EXITO, ESTADO_ERROR, ESTADO_NORMAL, ESTADO_CLOUD } from '../../values';

const IconEstado = ({estado}) => {
    return (
        <div className="text-center">
            {estado===ESTADO_CARGANDO && <LoadingIcon/>}
            {estado===ESTADO_NORMAL && <div className="text-primary"><CheckIcon/></div>}
            {estado===ESTADO_EXITO && <div className="text-success" title="Éxito"><CheckDouble/></div>}
            {estado===ESTADO_CLOUD && <div className="text-primary" title="Subido"><CloudIcon/></div>}
            {estado===ESTADO_ERROR && <div className="text-danger" title="Error"><ErrorIcon/></div>}
        </div>
    );
}

export default IconEstado;