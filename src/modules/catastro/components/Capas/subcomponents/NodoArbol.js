import React from 'react';
import GrupoCapas from './GrupoCapas';
import CapaAction from './CapaAction';

const NODO_GRUPO_CAPA = 'GrupoCapa';

const NodoArbol = ({ nodo, onContextMenu }) => {

    const { __typename: tipoNodo } = nodo;

    if (tipoNodo === NODO_GRUPO_CAPA) {
        return (
            <GrupoCapas
                grupo={nodo}
            >
                {
                    nodo.elementos.map((nod, index) =>
                        <NodoArbol
                            key={index}
                            nodo={nod}
                            onContextMenu={onContextMenu}
                        />
                    )
                }
            </GrupoCapas>
        );
    } else {
        return (
            <CapaAction
                capa={nodo}
                onContextMenu={onContextMenu}
            />
        );
    }
};

export default NodoArbol;