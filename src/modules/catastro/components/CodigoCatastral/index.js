import React from 'react';
import CodigoCatastralUsuario from './CodigoCatastralUsuario';
import CodigoCatastralPotencial from './CodigoCatastralPotencial';

export default ({ suministro, gid: gidPotencial }) => {
    if (suministro) return <CodigoCatastralUsuario suministro={suministro} />
    return <CodigoCatastralPotencial gid={gidPotencial} />
}