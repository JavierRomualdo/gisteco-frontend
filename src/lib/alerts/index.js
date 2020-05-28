import React from 'react';
import { WarningIcon, InfoIcon, CheckIcon, ErrorIcon } from '../icons';
export * from './types';

const AlertIcon = ({tipo}) => {
    switch (tipo){
        case 'warning':
            return <WarningIcon/>;
        case 'danger':
            return <ErrorIcon/>;
        case 'info':
            return <InfoIcon/>;
        case 'success':
            return <CheckIcon/>;
        default:
            throw new Error('Tipo de alerta desconocido');
    }
}

const Alert = ({tipo, children}) => (
    <div className = {`alert text-justify alert-${tipo}`} role="alert">
        <strong><AlertIcon tipo={tipo}/></strong> {children}
    </div>
);

export default Alert;