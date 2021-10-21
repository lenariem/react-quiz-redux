import React from 'react'
import './AnswerItem.css'

export default function AnswerItem(props) {
    const cls = ["AnswerItem"]
    
    if(props.answerState) {
        //console.log("props.answerState: " + props.answerState)
        cls.push(props.answerState)
    }

    return (
        <li 
            className={cls.join(" ")}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}
