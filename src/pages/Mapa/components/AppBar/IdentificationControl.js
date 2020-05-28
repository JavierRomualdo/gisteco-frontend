import React from 'react';
import FeatureSelector from '../../../../modules/global/components/FeatureSelector';
import GeoserverLayer from 'easyolmaps/layer/GeoserverLayer';
import { InputSwitch } from 'primereact/inputswitch';
import styled from 'styled-components';

const IDENTIFICACION = 'IDENTIFICACION';

const Switch = styled(InputSwitch)`
    &.p-inputswitch-checked .p-inputswitch-slider{
        background-color: var(--success) !important;
    }
`;

const MySwitch = styled.span`
    height: 24.5px;
    & > i{
        vertical-align: top;
        padding-top: 7px;
    }
`;

export default () => {
    return (
        <FeatureSelector
            tarea={IDENTIFICACION}
            layerFilter={(ly) => {
                if (!(ly instanceof GeoserverLayer && ly.getVisible())) return false;
                return true;
            }}
        >
            {(start, finish, { onProgress }) => {
                return (
                    <MySwitch id="identificationWdgt" className='d-flex'>
                        <i className='fas fa-info fa-lg text-white mr-2' />
                        <Switch
                            className='mr-2'
                            checked={onProgress}
                            onChange={() => {
                                if (onProgress) finish();
                                else start();
                            }}
                        />
                    </MySwitch>

                );
            }}
        </FeatureSelector>
    );
}