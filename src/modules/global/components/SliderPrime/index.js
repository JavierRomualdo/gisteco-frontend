import React from 'react';
import {Slider} from 'primereact/slider';

const SliderPrime = ({...otrasPropiedades}) => (
    <Slider {...otrasPropiedades} style={{width: '14em'}} />
);

export default SliderPrime;