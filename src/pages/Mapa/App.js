import React, { useState, useEffect } from 'react';
import AppBar from './components/AppBar';
import styled from 'styled-components';
import SidebarMap from '../../modules/global/components/SidebarMap';
import Store from './store/Store';
import MapaOL from '../../modules/global/components/MapaOL';
import Popup from './components/Popup';
import { AbilityContext, createAbilitiesForUser } from './casl/ability';
import Tour from './joyride';
import Swal from 'sweetalert2';


const AppContainer = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
`;

const MapContainer = styled.div`
    margin-top: 47px;
    width: 100%;
    height: calc(100% - 47px);
`;

const welcomeMessage = {
    title: '¡Bienvenido!',
    text: "Estás usando la versión 2.0 de GISTECO. ¡Empieza el tour para familiarizarte!",
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Empezar',
    cancelButtonText: 'Saltar',
    buttonsStyling: false,
    customClass: {
        confirmButton: 'btn btn-success mr-2',
        cancelButton: 'btn btn-light'
    }
};

export default ({ appData }) => {
    //const [steps] = useState(initSteps);
    const [run, setRun] = useState(false);

    const ability = createAbilitiesForUser({
        informesCapaAutorizados: appData.sistema.informesCapaAutorizados,
        opcionesAutorizadasMenu: appData.sistema.opcionesAutorizadasMenu
    });

    useEffect(() => {
        Swal.fire(welcomeMessage)
            .then((result) => {
                if (result.value) {
                    setRun(true);
                }
            })
    }, []);

    return (
        <AppContainer>
            <Store appData={appData}>
                <Tour run={run} />
                <AbilityContext.Provider value={ability}>
                    <AppBar />
                    <MapContainer>
                        <SidebarMap />
                        <MapaOL />
                        <Popup />
                    </MapContainer>
                </AbilityContext.Provider>
            </Store>
        </AppContainer>
    )
}