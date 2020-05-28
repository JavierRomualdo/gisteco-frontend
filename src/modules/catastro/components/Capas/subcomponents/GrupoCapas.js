import React from 'react';
import { CaretRightIcon } from '../../../../../lib/icons';

const Container = ({ children }) => (
    <div className='grupo-capa'>
        {children}
    </div>
);

const Action = ({ collapse, title }) => (
    <a className="grupo-capa-titulo" data-toggle="collapse" href={`#${collapse}`}
        role="button" aria-expanded="false" aria-controls={collapse}>
        <CaretRightIcon /> {title}
    </a>
);

const GrupoCapaItems = ({ id, children }) => (
    <ul className='grupo-capa-items collapse' id={id}>
        {children}
    </ul>
);

export default ({ grupo, children }) => {
    return (
        <React.Fragment>
            {
                grupo.elementos.length > 0 &&
                <Container>
                    <Action
                        title={grupo.nombre}
                        collapse={`collapseGC${grupo.id}`}
                    />
                    <GrupoCapaItems id={`collapseGC${grupo.id}`}>
                        {children}
                    </GrupoCapaItems>
                </Container>
            }
        </React.Fragment>
    );
}