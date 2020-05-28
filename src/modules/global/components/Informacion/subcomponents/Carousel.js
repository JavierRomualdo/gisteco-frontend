import React from 'react';
import { Carousel } from 'primereact/carousel';
import './Carousel.css';
import { INFO_COLLAPSE_ID } from '../values';
import withDashboardControl from './withDashboardControl';

const ReportItem = ({ item, dashboardControl: { mostrarComponente } }) => (
    <div className='text-center'>
        <div className='i-carousel-item text-center overflow-hidden'
            data-toggle="collapse"
            data-target={`#${INFO_COLLAPSE_ID}`}
            aria-expanded="false"
            aria-controls={INFO_COLLAPSE_ID}
            onClick={() => {
                mostrarComponente(item.component, item.props)
            }}
        >
            <i className={`i-carouse-item-icon ${item.icon}`} />
        </div >
        <label className='i-carousel-item-label'>
            {item.titulo}
        </label>
    </div>
);

const itemTemplate = (item) => {
    const Item = withDashboardControl(ReportItem);
    return <Item item={item} />
}

export default ({ items }) => (
    <div className='my-2'>
        <Carousel
            numVisible={4}
            numScroll={2}
            value={items}
            itemTemplate={itemTemplate}
            dotsContainerClassName='d-none'
        />
    </div>
);