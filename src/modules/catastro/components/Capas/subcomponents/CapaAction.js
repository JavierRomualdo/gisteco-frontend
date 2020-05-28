import React, { useState, useEffect } from 'react';
import { withStore } from '../../../../../pages/Mapa/store/Store';
import { FilterIcon } from '../../../../../lib/icons';

export default withStore(({ capa, onContextMenu, storeContext: { map } }) => {
    const ly = map.getCapaById(capa.id);
    const [checked, setChecked] = useState(ly.getVisible());

    useEffect(() => {
        ly.on('change:visible', () => {
            setChecked(ly.getVisible());
        })
    }, [ly]);

    return (
        <li>
            <input
                id={`cbcapa${capa.id}`}
                type="checkbox"
                checked={checked}
                onChange={() => {
                    ly.setVisible(!ly.getVisible());
                }}
            />
            <label
                htmlFor={`cbcapa${capa.id}`}
                className="ml-2 form-check-label"
                onContextMenu={onContextMenu.bind(null, ly)}
            >
                {capa.nombre}
            </label>
            {ly.getFilter() && <FilterIcon />}
        </li>
    );
});
