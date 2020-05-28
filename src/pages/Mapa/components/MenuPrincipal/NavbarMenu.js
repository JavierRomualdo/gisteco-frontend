import React from 'react';
import Menu from './Menu';

export default ({ menus }) => {

    return (
        <ul id="mainMenuWdgt" className="navbar-nav mr-auto fadeIn animated">
            {menus.map((menu, index) => {
                return (
                    <Menu
                        key={index}
                        menu={menu}
                    />
                );
            })}
        </ul>
    );
}