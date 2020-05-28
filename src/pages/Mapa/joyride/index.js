import React from 'react';
import Joyride, { EVENTS } from 'react-joyride';
import steps from './steps';
import Swal from 'sweetalert2';

export default ({ run }) => {
    return (
        <Joyride
            steps={steps}
            run={run}
            continuous={true}
            showSkipButton={true}
            disableOverlayClose={true}
            spotlightClicks={true}
            locale={{
                back: 'Anterior',
                close: 'Cerrar',
                last: 'Terminar',
                next: 'Siguiente',
                skip: 'Saltar'
            }}
            styles={{
                options: {
                    zIndex: 1030
                }
            }}
            callback={(e) => {
                if (e.type === EVENTS.TOUR_END) {
                    Swal.fire(
                        '¡Hemos terminado el Tour!',
                        'Ahora conoces un poco mejor el sistema, pero puedes continuar explorando por tu cuenta... puedes empezar dando clic derecho sobre el mapa.',
                        'success'
                    ).then(result => {
                        if (result.value) {
                            Swal.fire(
                                '¿Necesitas ayuda?',
                                'Si tienes alguna duda o necesitas guía, por favor ponte en contacto con la oficina de Informática.',
                                'question'
                            );
                        }
                    })
                }
            }}
        />
    );
}