import React, { Suspense } from 'react';
import { LoadingIcon } from '../../../../lib/icons';
import { resolveTarea } from './mapper';

const loading = <div className="text-center mt-4" > <LoadingIcon /></div>;

class Tarea {
    constructor(componenteId, titulo, props) {
        const { componente, titulo: TituloPorDefecto, async, initProps } = resolveTarea(componenteId);
        this.id = componenteId;
        this.props = props || (initProps && initProps()) || {};
        this.componente = componente; // en caso de que el componente
        //se vaya a cargar asíncronamente, esta propiedad será la ruta del componente,
        //en caso contrario será la definición del componente en sí.
        this.async = async;
        this.titulo = titulo || TituloPorDefecto;
    }

    render() {
        const { componente: Componente, async, props } = this;
        if (async) {
            return <Suspense fallback={loading}>
                <Componente {...props} />
            </Suspense>
        }
        return <Componente {...props} />
    }
}

export default Tarea;