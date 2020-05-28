import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ESTILOS_LISTA_CAPAS } from '../estilos';
import NodoArbol from './NodoArbol';
import { ContextMenu } from 'primereact/contextmenu';
import { crearMenuContextual } from '../config';
import { withStore } from '../../../../../pages/Mapa/store/Store';
import { useAbility } from '../../../../../pages/Mapa/casl/ability';

const CapasContainer = styled.div`${ESTILOS_LISTA_CAPAS}`;

export default withStore(({ capas, storeContext }) => {
    const [menuContextual, setMenuContextual] = useState([]);
    const ability = useAbility();
    const cm = useRef(null);

    function handleContextMenu(capa, e) {
        e.preventDefault();
        setMenuContextual(crearMenuContextual(capa, storeContext, ability));
        cm.current.show(e);
    }

    return (
        <div>
            <CapasContainer>
                {
                    capas.map((nodo, index) =>
                        <NodoArbol
                            key={index}
                            nodo={nodo}
                            onContextMenu={handleContextMenu}
                        />
                    )
                }
            </CapasContainer>
            <ContextMenu
                ref={cm}
                model={menuContextual}
                appendTo={document.getElementsByTagName('body')[0]}
                baseZIndex={1030}
            />
        </div>
    );
})