import React from 'react';

export default ({ value, selection, ...restProps }) => {

    const btnStyle = selection ? 'btn-success' : 'btn-primary';
    const btnClassName = `far fa-hand-pointer btn btn-sm ${btnStyle}`;

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control form-control-sm"
                placeholder='Seleccione tubería'
                disabled={true}
                readOnly={true}
                required={true}
                value={value}
            />
            <div className="input-group-append">
                <button
                    type='button' className={btnClassName}
                    {...restProps}
                />
            </div>
        </div>
    );
}