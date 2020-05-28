import React from 'react';
import { MinusIcon } from '../../../../lib/icons';
import classnames from 'classnames';

export default ({ id, title, children, open: show }) => {

    return (
        <div className="card mb-1 border-filtro border-filtro">
            <div className="card-header p-1 font-size-titulo">
                <strong>{title}</strong>
                <div className="card-header-actions">
                    <span className="cursor-pointer card-header-action btn-minimize text-dark m-1" data-toggle="collapse"
                        data-target={`#${id}`} aria-expanded="false" aria-controls={id}>
                        <MinusIcon />
                    </span>
                </div>
            </div>
            <div className={classnames("card-body p-2 collapse", { show })} id={id}>
                {children}
            </div>
        </div>
    )
}