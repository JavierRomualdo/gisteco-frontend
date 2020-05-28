import React from 'react';

const ProgressBarAnimated = ({ titulo }) => {
    return (
        <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar"
                aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}>
                {titulo}
            </div>
        </div>
    );
}

export default ProgressBarAnimated;