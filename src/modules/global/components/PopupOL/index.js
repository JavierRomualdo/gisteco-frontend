import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { POPUP_STYLE, POPUP_TITLE_STYLE, POPUP_BODY_STYLE } from './estilos';
import Overlay from 'ol/Overlay.js';
import MapaApi from '../MapaOL/MapaApi';
/*import PopupClass from './Popup.class';*/
//import './estilos.css';
import { PaperclipIcon } from '../../../../lib/icons';

const Popup = styled.div`${POPUP_STYLE}`;
const PopupTitle = styled.h1`${POPUP_TITLE_STYLE}`;
const PopupContent = styled.section`${POPUP_BODY_STYLE}`;

const EmptyContent = () => <span>Sin contenido</span>;

const initialContent = {
    titulo: 'Sin título',
    componente: EmptyContent,
    props: {}
};


const init = (saveOverlay, element, map) => {
    console.log(element, map);
    const overlay = new Overlay({
        element,
        autoPan: true,
        autoPanAnimation: {
            duration: 250
        }
    });

    overlay.setPosition(undefined);

    element.querySelector("a.popup-closer").addEventListener('click', (e) => {
        overlay.setPosition(undefined);
        e.currentTarget.blur();
        return false;
    });

    map.addOverlay(overlay);

    saveOverlay(overlay);
}

const buildApi = (setOverlay, element) => {
    return {
        init: init.bind(null, setOverlay)
    }
}

const PopupOL = ({ children }) => {
    const popupRef = useRef(null);


    const [content, setContent] = useState(initialContent);
    const [overlay, setOverlay] = useState(null);
    /*
        useEffect(() => {
        console.log("Popupol se renderizó!!");
    })*/

    useEffect(() => {
        

    console.log("Popup didMount");

    return () => {
        console.log("Popup unmount");
    }

    }, []);

    //const { componente: Componente, props, titulo } = content;

    return (
        <React.Fragment>
            {children(buildApi(setOverlay))}
            <Popup id="popup" ref={popupRef}>
                <a className="popup-closer" />
                <PopupTitle className='popup-title'><PaperclipIcon />Título</PopupTitle>
                <PopupContent>
                    Hola!
            </PopupContent>
            </Popup>
        </React.Fragment>
    );
}

export default PopupOL;