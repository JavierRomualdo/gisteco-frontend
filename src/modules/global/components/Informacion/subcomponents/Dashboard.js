import React, { useState, createContext, useCallback } from 'react';
import DashboardControls from './DashboardControls';
import PropiedadesFeature from '../../PropiedadesFeature';
import { INFO_COLLAPSE_ID } from '../values';

const initialContent = {
    componente: null,
    props: {}
}

export const DashboardContext = createContext(null);

const FichaInformacionElemento = ({ capa, propiedades, diccionario }) => {
    const [contenido, setContenido] = useState(initialContent);

    const regresar = useCallback(() => {
        setContenido(initialContent);
    }, []);

    const mostrarComponente = useCallback((componente, props) => {
        setContenido({ componente, props });
    }, []);


    const { componente: Componente, props } = contenido;

    return (
        <DashboardContext.Provider
            value={{ regresar, mostrarComponente }}
        >
            <div>
                <label className='font-weight-bold'>{capa.get('nombre')}</label>
                <div id={INFO_COLLAPSE_ID} className="collapse show">
                    <div className="card border-radius-0">
                        <div className="card-header border-primary text-white bg-info px-2 py-2 border-radius-0">
                            <label className='font-weight-bold m-0'>Informes</label>
                        </div>
                        <div className="card-body p-0 border-radius-0">
                            <DashboardControls
                                capa={capa}
                                propiedades={propiedades}
                            />
                        </div>
                    </div>
                    <PropiedadesFeature
                        propiedades={propiedades}
                        diccionario={diccionario}
                    />
                </div>
                {
                    Componente &&
                    <Componente
                        propiedades={propiedades}
                        {...props}
                    />
                }
            </div>
        </DashboardContext.Provider>
    );
}

export default FichaInformacionElemento;