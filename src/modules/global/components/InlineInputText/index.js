
import React from 'react';
import classnames from 'classnames';

const InlineInputText = ({tamanio,...restProps}) => {
    return (
        <div className="col-auto">
            <input type="text" className={classnames("form-control form-control-sm mb-1", tamanio)}
             {...restProps} required/>
        </div>
    );
}

export default InlineInputText;