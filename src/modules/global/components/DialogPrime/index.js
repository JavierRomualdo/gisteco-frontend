import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';

const DialogPrime = ({ children, ...otrasPropiedades }) => (

    <Dialog appendTo={document.getElementsByTagName('body')[0]} modal={true} {...otrasPropiedades}>
        {children}
    </Dialog>
);

export default DialogPrime;