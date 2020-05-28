import React, { useState, useEffect } from 'react';
import './estilos.css';
import { withStore } from '../../store/Store';
import { extendMapFunctionality } from './config';

const initialState = {
    titulo: '',
    component: null,
    props: {}
}

export default withStore(({ storeContext: { map } }) => {

    const [content, setContent] = useState(initialState)

    useEffect(() => {
        const el = document.getElementById('popup'),
            closer = document.querySelector('.ol-popup .ol-popup-closer');
        map.popup.setElement(el);
        el.classList.remove('d-none');

        // when closing popup
        closer.addEventListener('click', (e) => {
            e.preventDefault();
            map.popup.setPosition(null);
            setContent(initialState);
        });

        extendMapFunctionality(map, setContent);

    }, [map]);

    const { titulo, component: Component, props } = content;

    return (
        <div className="ol-popup d-none" id="popup">
            <span className="ol-popup-closer cursor-pointer rounded-closer" />
            <h1 className="ol-popup-title">{titulo}</h1>
            <div className="ol-popup-body">
                {Component && <Component {...props} />}
            </div>
        </div>
    );
})