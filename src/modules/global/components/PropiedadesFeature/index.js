import React from 'react';
import { formatearPropiedades, LABEL_INFORMACION } from './values';
//import { BookIcon, MinusIcon } from '../../../../lib/icons';

const Propiedad = ({ propiedad, valor, icono }) => (
    <span>
        <strong className="text-informacion">
            <i className={icono}></i> {propiedad}
        </strong>
        : <strong>{valor}</strong>
    </span>
);

const PropiedadAction = ({ propiedad, id }) => (
    <li className="list-group-item bg-gris py-2 pl-3 pr-2">
        <Propiedad {...propiedad} />
        {/*<div className="card-header-actions">
            <div className="card-header-action">
                <a className="text-dark"
                    data-toggle="collapse" href={`#${id}`} role="button"
                    aria-expanded="false" aria-controls={id}>
                    <MinusIcon />
                </a>
            </div>
        </div>*/}
    </li>
);

/*const DescripcionPropiedad = ({ descripcion, id }) => (
    <div className="collapse" id={id}>
        <div className="card border border-informacion border-radius-0">
            <div className="card-body py-2 pl-5 border-radius-0" title="Descripción">
                <BookIcon /> <strong>{descripcion}</strong>
            </div>
        </div>
    </div>
);*/

const PropiedadItem = ({ propiedad, id }) => (
    <React.Fragment>
        <PropiedadAction
            propiedad={propiedad}
            id={id}
        />
        {/*<DescripcionPropiedad
            descripcion={propiedad.descripcion}
            id={id}
        />*/}
    </React.Fragment>
)

const PropiedadesFeature = ({ propiedades, diccionario }) => {
    const props = formatearPropiedades(propiedades, diccionario);
    return (
        <div className="card border-radius-0">
            <div className="card-header border-primary text-white bg-info px-2 py-2 border-radius-0">
                <label className='font-weight-bold m-0'>{LABEL_INFORMACION}</label>
            </div>
            <div className="card-body p-0 border-radius-0º">
                <ul className="list-group">
                    {props.map((prop, index) =>
                        <PropiedadItem
                            key={index}
                            propiedad={prop}
                            id={`pfcollapse${index}`}
                        />
                    )}
                </ul>
            </div>
        </div>
    );
}

export default PropiedadesFeature;