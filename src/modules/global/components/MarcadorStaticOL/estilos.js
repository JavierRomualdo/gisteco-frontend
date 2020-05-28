import { Icon, Style } from 'ol/style.js';
import marker from '../../../../assets/img/marker.png';

export const estiloMarcadorStatico = () =>
    new Style({
        image: new Icon(/** @type {module:ol/style/Icon~Options} */({
            anchor: [0.5, 0],
            anchorOrigin: 'bottom-left',
            scale: 1,
            src: marker
        }))
    });
