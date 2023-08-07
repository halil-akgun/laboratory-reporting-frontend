import React from "react";

const Input = (props) => {
    const { label, error, name, onChange, type, defaultValue } = props;
    let className = 'pt-1 pb-1 form-control';
    if (error !== undefined) {
        className += ' is-invalid';
    }
    return (
        <div className="mb-2 form-group">
            <label>{label}</label>
            <input className={className} name={name} onChange={onChange} type={type} defaultValue={defaultValue} />
            <div className="invalid-feedback">
                {error}
            </div>
        </div>
    );
}

export default Input;