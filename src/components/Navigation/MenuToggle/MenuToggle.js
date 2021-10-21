import React from 'react'
import './MenuToggle.css'

export default function MenuToggle(props) {
    let cls;
    if(props.isOpen) {
        cls = 'fa-times open'
    } else {
        cls = 'fa-bars'
    }

    return (
        <div>
            <i
                className={"MenuToggle fa " + cls}
                onClick={props.onToggle}
            />
        </div>
    )
}
