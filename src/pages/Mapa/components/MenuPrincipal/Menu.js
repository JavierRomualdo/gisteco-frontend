import React from 'react';
import MenuItem from './MenuItem';

const Title = ({ titulo, id }) => {
    return (
        <span
            className="nav-link dropdown-toggle hvr-underline-reveal cursor-pointer text-white"
            id={id}
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            {titulo}
        </span>
    )
}

export default ({ menu }) => {

    const id = `nvbMenu${menu.id}`;

    return (
        <li className="nav-item dropdown">
            <Title titulo={menu.titulo} id={id} />
            <div className="dropdown-menu" aria-labelledby={id}>
                {
                    menu.opciones.map((menuItem, index) =>
                        <MenuItem menuItem={menuItem} key={index} />
                    )
                }
            </div>
        </li>
    );
}