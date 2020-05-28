import React from 'react';

const TabComponentContainer = ({ children }) => {
    return (
        <div className="container-fluid mt-2">
            <div className='row'>
                <div className='col'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default TabComponentContainer;