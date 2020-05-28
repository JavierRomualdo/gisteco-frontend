import React from 'react';

const ButtonAction = ({ type, children, onClickButton, ...otrasPropiedades }) => {
    return (
        <button type={type} {...otrasPropiedades} onClick={onClickButton}>
            {children}
        </button>
    );
}

export default ButtonAction;