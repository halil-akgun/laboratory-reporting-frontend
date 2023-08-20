import React from 'react';

const ButtonWithProgress = (props) => {

    const { onClick, pendingApiCall, disabled, text, countdown = '' } = props;

    return (
        <button
            className="btn btn-primary"
            onClick={onClick}
            disabled={disabled}>
            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
            {text}
            <span className='ms-2'>{countdown}</span>
        </button>
    );
};

export default ButtonWithProgress;