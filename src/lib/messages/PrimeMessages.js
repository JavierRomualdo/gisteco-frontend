import React, { Fragment } from 'react';
import { Growl } from 'primereact/growl';
import messages from './messages';
import styled from 'styled-components';

const CustomStyledGrow = styled(Growl)`
    top: 71px !important;
`;

const PrimeMessages = ({ children }) => {
    return <Fragment>
        {children}
        <CustomStyledGrow ref={el => messages.setGrowl(el)}/>
    </Fragment>
}

export default PrimeMessages;