import React from 'react';
import { UploadIcon } from '../../../../lib/icons';

const ButtonDowloand = ({archivo, ...otrasPropiedades}) => {
    return (
        <a href={archivo} {...otrasPropiedades}>
            <UploadIcon/>
        </a>
    );
}

export default ButtonDowloand;