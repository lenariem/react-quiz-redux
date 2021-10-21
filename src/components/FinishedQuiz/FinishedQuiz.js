import React from 'react'
import './FinishedQuiz.css'
import Button from "../UI/Button/Button"
import { Link } from 'react-router-dom'


export default function FinishedQuiz(props) {

  const rightCount = Object.keys(props.results).reduce((total, current) => {
    if(props.results[current] === 'right') {
      total++
    }
    return total
  }, 0)
 
    return (
      <div className="FinishedQuiz">
        <ul>
          {props.quiz.map((quizItem, i) => {
            const cls = [
              "fa",
              props.results[quizItem.id] === "wrong"
                ? "fa-times wrong"
                : "fa-check right",
            ];

            return (
              <li key={i}>
                <strong>{i + 1}. </strong>
                {quizItem.question}
                <i className={cls.join(" ")}></i>
              </li>
            );
          })}
        </ul>

        <p>
          Correct {rightCount} from {props.quiz.length}
        </p>
        <div>
          <Button onClick={props.onRepeat} type="primaryBtn">Repeat</Button>
          <Link to="/">
            <Button type="rightBtn">Move to Quiz List</Button>
          </Link>
        </div>
      </div>
    );
}
