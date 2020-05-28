import React from 'react';
import gisicon from '../../../../assets/img/main-logo.svg';

const CardInfoSession = ({titulo, empresa, width}) => {
    return (
        <div className="card flex-row align-items-center text-white bg-empresa py-5 d-md-down-none" id="cardDerecha">
            <div className="card-body text-center">
                <img src={gisicon} width={width} alt=".."/>
                {titulo && <p>{titulo}</p>}
                {empresa && <h5>{empresa}</h5>}
            </div>
        </div>
    );
}

export default CardInfoSession;