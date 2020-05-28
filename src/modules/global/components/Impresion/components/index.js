import React from 'react';
import fileImg from './pdf_file.png';

export const Label = ({ children, ...restParams }) =>
    <label
        className='col-sm-3 col-form-label col-form-label-sm'
        {...restParams}
    >
        {children}
    </label>

export const FormControl = ({ children }) => <div className='col-sm-9'>{children}</div>

export const Progress = () => <div className='flex-grow-1 ml-2'>
    <div className="progress">
        <div
            className="progress-bar progress-bar-striped progress-bar-animated bg-success"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '100%' }}
        >Creando archivo...</div>
    </div>
</div>

export const FileLink = ({ url }) =>
    <a
        className='ml-2 text-dark'
        href={url}
        target="_blank"
        rel="noopener noreferrer"
    >
        <img
            className='mr-2'
            src={fileImg} alt="Archivo" />
        {`mapa_impresion.pdf`}
    </a>