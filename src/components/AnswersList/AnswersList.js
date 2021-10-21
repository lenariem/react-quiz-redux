import React from 'react'
import './AnswersList.css'
import AnswerItem from '../AnswerItem/AnswerItem'

export default function AnswersList(props) {
    return (
            <ul className="AnswersList">
                {props.answers.map((answer, i) => {
                    return (
                        <AnswerItem 
                            answer={answer}
                            key={i}
                            onAnswerClick={props.onAnswerClick}
                            answerState = {props.answerState ? props.answerState[answer.id] : null}
                        />
                    )
                })}
            </ul>

    )
}
