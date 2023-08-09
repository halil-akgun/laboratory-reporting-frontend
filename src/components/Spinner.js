import React from 'react';

const Spinner = ({ size = "30px" }) => {
    return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-black-50" style={{ width: size, height: size }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Spinner;
