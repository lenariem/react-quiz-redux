import React from 'react'
import './Backdrop.css'

export default function Backdrop(props) {
    return <div className="Backdrop" onClick={props.onClick}></div>
}
