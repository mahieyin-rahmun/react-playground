// stateless component
import React from 'react'

const InputGroup = (props) => {
    let { label, type, name, placeholder, value, onChange } = props;

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className="form-control form-control-lg"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputGroup;
