import React from 'react';
import { ListBox } from 'primereact/listbox';

const ListBoxPrime = ({ etiqueta, ...otrasPropieades }) => (
    <div className="form-group">
        <label><strong>{etiqueta}</strong></label>
        <ListBox {...otrasPropieades} style={{width: '100%'}} listStyle={{maxHeight: '80px'}}/>
    </div>
);

export default ListBoxPrime;