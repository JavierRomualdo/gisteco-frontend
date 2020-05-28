import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LABEL_ACEPTAR } from '../../values';

const MySwal = withReactContent(Swal)

export function generarSwallConfirmation({title, text, type, showCancelButton, confirmButtonColor, cancelButtonColor, confirmButtonText, cancelButtonText}) {
    return MySwal.fire({
    title: <p>{title}</p>,
    text,
    type,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText
    }).then(result => result.value);
};

export function generarSwallMensaje(type, title, text) {
    MySwal.fire({
        type,
        title: <p>{title}</p>,
        text,
        showConfirmButton: true,
        confirmButtonText: LABEL_ACEPTAR
    });
}

export function generarSwallConfirmationInputText({title, text, textValidator, type, showCancelButton, confirmButtonColor, cancelButtonColor, 
    confirmButtonText, cancelButtonText}) {
    return MySwal.fire({
    title: <p>{title}</p>,
    input: 'text',
    inputValidator: result => !result && textValidator,
    text,
    type,
    showCancelButton,
    confirmButtonColor,
    cancelButtonColor,
    confirmButtonText,
    cancelButtonText
    }).then(result => result.value);
};