
import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

const ImagenAccion = ({imagen}) => {
    const [visible, setVisible] = useState(false);

    function onHide() {
        setVisible(false);
    }

    function onClickMostrarImagen() {
        setVisible(true);
    }
    return (
        <div>
            <img src={imagen} className="rounded mx-auto d-block cursor-pointer" onClick={onClickMostrarImagen} width="25" height="25" />
            <Dialog header="Imagen" visible={visible} style={{width: '50vw'}} onHide={onHide} appendTo={document.getElementsByTagName('body')[0]}>
                <img src={imagen} className="rounded mx-auto d-block img-fluid"/>
            </Dialog>
        </div>
        
    );
}

export default ImagenAccion;