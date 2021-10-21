import React from 'react'
import './Button.css'

export default function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className={"Button " + props.type}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}
