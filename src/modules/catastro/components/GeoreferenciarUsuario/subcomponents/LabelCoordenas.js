import React from 'react';

const LabelCoordenadas = ({ coordinate, imgMarker }) => (
    <div>
        <label>
            <strong className='mr-2'>Coordenadas</strong>
            <img style={{ width: '16px' }} src={imgMarker} title="Marcador" width="30px" alt='' />
        </label>
        <div>
            <span className='mr-2'>
                <strong className='mr-2'>X:</strong>
                <span>{coordinate[0]}</span>
            </span>
            <span>
                <strong className='mr-2'>Y:</strong>
                <span>{coordinate[1]}</span>
            </span>
        </div>
    </div>
);

export default LabelCoordenadas;