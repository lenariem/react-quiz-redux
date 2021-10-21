import React from 'react'
import './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

export default function Input(props) {
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    let cls = "Input "

    if(isInvalid(props)) {
        cls = cls + "invalid" 
    }
    
    return (
        <div className={cls}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />

            {
                isInvalid(props)
                   ? <span>{props.errorMessage || "Please enter a valid data"}</span>
                   : null
            }
            
        </div>
    )
}
