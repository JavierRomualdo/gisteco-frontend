import React, { useState, useEffect, useRef } from 'react';
import AutoCompleteCapas from '../../global/components/AutoCompleteCapas';
import classnames from 'classnames';
import SymbologyPanel from './subcomponents/SymbologyPanel';
import { withStore } from '../../../pages/Mapa/store/Store';

const capaInputId = 'capaEstilosInput';

const Estilos = ({ capa, storeContext: { map } }) => {
    const [capaSeleccionada, setCapaSeleccionada] = useState(capa);
    const symbologyRef = useRef(null);

    useEffect(() => {
        setCapaSeleccionada(capa);
    }, [capa]);

    function handleCapaSelect(e) {
        const capaSeleccionada = map.getCapaById(e.value.id);
        setCapaSeleccionada(capaSeleccionada);
    }

    function handleInputChange(e) {
        setCapaSeleccionada(null);
    }
    const capaInputText = capaSeleccionada ? capaSeleccionada.get('nombre') : '';

    return (
        <div className='p-3'>
            <AutoCompleteCapas
                value={capaInputText}
                inputId={capaInputId}
                autoFocus={true}
                inputClassName={classnames({ 'is-invalid': !capaSeleccionada })}
                onSelect={handleCapaSelect}
                onChange={handleInputChange}
            />
            {capaSeleccionada && <SymbologyPanel gslayer={capaSeleccionada} ref={symbologyRef} />}
        </div>
    );
}

export default withStore(Estilos);