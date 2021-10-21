import React from 'react'
import './ActiveQuiz.css'
import AnswersList from '../AnswersList/AnswersList';

export default function ActiveQuiz(props) {
    return (
      <div className="ActiveQuiz">
        <p className="Question">
          <span>
            <strong>{props.answerNumber}. </strong>
           {props.question}
          </span>

          <small>{props.answerNumber} / {props.quizLength}</small>
        </p>

         <AnswersList 
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            answerState = {props.answerState}
        />
      </div>
    );
}
