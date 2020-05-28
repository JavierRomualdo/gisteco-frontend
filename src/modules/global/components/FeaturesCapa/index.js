import { useState, useEffect, useCallback } from 'react';

const formatFeatures = (features, formatFfcn) => {
    if (!formatFfcn) return features;
    return formatFfcn(features);
}

export default ({ capa, children, format }) => {
    const [features, setFeatures] = useState(capa.getSource().getFeatures());

    const handleChange = useCallback((e) => {
        setFeatures(e.target.getFeatures());
    }, []);

    useEffect(() => {
        capa.getSource().on('change', handleChange);
        return () => {
            capa.getSource().un('change', handleChange);
        }
    }, [capa, handleChange]);

    return children(formatFeatures(features, format));
}