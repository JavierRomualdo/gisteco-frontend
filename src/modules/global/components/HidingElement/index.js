import React from 'react';

const HidingElement = ({children}) => (
    <span className="d-none d-md-inline">{children}</span>
);

export default HidingElement;