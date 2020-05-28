import React, { useState, useEffect } from 'react';

const loadLegend = (capa, setLegend) => {
    capa.getLegendGraphic({ STYLE: capa.getStyle(), SCALE: 2000000, LEGEND_OPTIONS: 'forceLabels:on', ENV: capa.getSource().getParams().ENV })
        .then(imgEl => setLegend(imgEl));
};

const LeyendaMapa = ({ capa }) => {
    const [legend, setLegend] = useState(null);
    const style = capa.getStyle(),
        env = capa.getSource().getParams().ENV;

    useEffect(() => {
        loadLegend(capa, setLegend)
    }, [capa, style, env]);

    return (
        <div>
            {legend ? <img src={legend.src} alt='' /> : 'Cargando...'}
        </div>
    );
}

export default LeyendaMapa;