import React from "react";

const Input = (props) => {
    const { label, error, name, onChange, type, defaultValue } = props;
    let className = 'pt-1 pb-1 form-control';
    if (error !== undefined) {
        className += ' is-invalid';
    }
    return (
        // <div className="mb-2 form-group">
        //     <label>{label}</label>
        //     <input className={className} name={name} onChange={onChange} type={type} defaultValue={defaultValue} />
        //     <div className="invalid-feedback">
        //         {error}
        //     </div>
        // </div>
        <div className="mb-2 form-group row d-flex">
            <div className="col-md-5 text-start pe-1 ">
                <label for={name} className="col-form-label pt-1">{label}</label>
            </div>
            <div className="col-md-7">
                <input id={name} className={className} name={name} onChange={onChange} type={type} defaultValue={defaultValue} />
                <div className="invalid-feedback">
                    {error}
                </div>
            </div>
        </div>
    );
}

export default Input;