import React from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

export const footer = (onClickAceptar, onHide) => (
    <div>
        <Button label="Aceptar" icon="pi pi-check" onClick={onClickAceptar}/>
        <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={onHide}/>
    </div>
);

const InputDialog = ({children, onClickAceptar, ...otrasPropiedades}) => {
    const { onHide } = { ...otrasPropiedades };
    return (
        <div className="content-section implementation">
            <Dialog footer={footer(onClickAceptar, onHide)} {...otrasPropiedades}>
                {children}
            </Dialog>
        </div>
    );
};

export default InputDialog;