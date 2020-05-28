import Tareas from "../Tareas";
import Medicion from "../Medicion";
import Capas from "../../../catastro/components/Capas";
import Informacion from "../Informacion";
import LeyendaMapa from "../LeyendaMapa";
import Impresion from "../Impresion";
import Reportes from "../Reportes";
import StreetView from '../StreetView';

export const TAREAS = 'TAREAS',
    MEDICION = 'MEDICION',
    CAPAS = 'CAPAS',
    INFORMACION = 'INFORMACION',
    LEYENDA = 'LEYENDA',
    IMPRESION = 'IMPRESION',
    REPORTES = 'REPORTES',
    STREET_VIEW = 'STREET_VIEW';

const componente = {
    [TAREAS]: Tareas,
    [MEDICION]: Medicion,
    [CAPAS]: Capas,
    [INFORMACION]: Informacion,
    [LEYENDA]: LeyendaMapa,
    [IMPRESION]: Impresion,
    [REPORTES]: Reportes,
    [STREET_VIEW]: StreetView
};

export const resolveComponente = (componenteId) => componente[componenteId]