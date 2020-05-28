import React from 'react';

const TextInputGroup =  ({title, onInputChange, etiqueta, children, onClick, classNameButton,textHelp, classHelp, ...otrasPropiedades}) => {
    return (
        <div>
            <label><strong>{etiqueta}</strong></label>
            <div className="form-inline row mb-3">
                <div className="input-group col-md-12">
                    <input className="form-control form-control-sm" size="40" aria-label="Search" required autoComplete="off"
                        onChange={onInputChange} {...otrasPropiedades}/>
                    <div className="input-group-append">
                        <button className={classNameButton ? classNameButton : 'btn btn-primary btn-sm'} type='button' title={title} onClick={onClick}>
                            {children}
                        </button>
                    </div>
                </div>
                <span id="emailHelp" className={`${classHelp} ml-3`}>{textHelp}</span>
            </div>
        </div>
    );
}

export default TextInputGroup;