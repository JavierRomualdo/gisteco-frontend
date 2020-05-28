import React from 'react';
import ArbolCapas from './ArbolCapas';

export default ({ capas }) => {
    return (
        <div className='p-2'>
            <ArbolCapas capas={capas} />
        </div>
    );
}