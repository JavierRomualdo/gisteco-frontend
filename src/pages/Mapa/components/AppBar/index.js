import React from 'react';
import gisicon from './gis_logo.svg'
import styled from 'styled-components';
import MenuPrincipal from '../MenuPrincipal';
import GoogleAutocomplete from '../GoogleAutocomplete';
import UserMenu from '../UserMenu';
import IdentificationControl from './IdentificationControl';

const Nav = styled.div`
	min-height: 47px;
`;

const NOMBRE_SISTEMA = 'GISTECO 2.0',
    navbarId = 'navbarSupportedContent';

const AppBar = () => (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top fadeIn animated">
        <span className="navbar-brand p-0 text-white">
            <img className='navbar-brand p-0 m-0' src={gisicon} alt="..." width="25" />
            <span className="d-none d-md-inline"> {NOMBRE_SISTEMA} </span>
        </span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target={`#${navbarId}`}
            aria-controls={navbarId} aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id={navbarId}>
            <MenuPrincipal />
            <IdentificationControl />
            <GoogleAutocomplete />
            <UserMenu />
        </div>
    </Nav>
);

export default AppBar;