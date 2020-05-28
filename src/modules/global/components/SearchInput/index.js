import React from 'react';
import { SearchIcon } from '../../../../lib/icons';

const SearchInput =  ({value, placeholder, autoFocus, maxLength, onInputChange, onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-inline row mb-3 mt-3">
                <div className="input-group col-md-12">
                    <input className="form-control form-control-sm" name="buscar" placeholder={placeholder}
                        size="40" aria-label="Search" required autoComplete="off" maxLength={maxLength}
                        value = {value} onChange={onInputChange} autoFocus={autoFocus}
                        />
                    <div className="input-group-append">
                        <button className="btn btn-primary btn-sm" type='submit' title="buscar" >
                            <SearchIcon/>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SearchInput;