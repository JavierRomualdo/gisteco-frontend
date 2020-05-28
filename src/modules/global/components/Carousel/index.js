import React from 'react';
import classnames from 'classnames';

const Carousel = ({imagenes}) => {
    return (
    <div id="carouselExampleIndicators" className="carousel slide collapse show" data-ride="carousel">
        <ol className="carousel-indicators">
            {imagenes.map((imagen, index)=> (<li data-target="#carouselExampleIndicators" key={index} data-slide-to={index} className={classnames({ "active": index===0 })}></li>) )}
        </ol>
        <div className="carousel-inner">
            {imagenes.map((imagen, index) => (
                <div className={classnames("carousel-item",{ "active": index===0 })} key={index}>
                    <img className="d-block w-50 mx-auto" src={imagen}/>
              </div>
            ) )}
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
    </div>
    );
};

export default Carousel;