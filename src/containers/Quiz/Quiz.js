import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class Quiz extends Component {
  state = {
    results: {}, // {[id]: right wrong}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, //{[id]: 'right' 'wrong'}
    quiz: [
      /*  {
        question: "What year did React appear?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "2012", id: 1 },
          { text: "2013", id: 2 },
          { text: "2014", id: 3 },
          { text: "2015", id: 4 },
        ]
      },
      {
        question: "Which company created React?",
        rightAnswerId: 1,
        id: 2,
        answers: [
          { text: "Facebook", id: 1 },
          { text: "Apple", id: 2 },
          { text: "Google", id: 3 },
          { text: "Microsoft", id: 4 },
        ],
      },
      {
        question: "Which is used to keep the value of components unique?",
        rightAnswerId: 3,
        id: 3,
        answers: [
          { text: "Ref", id: 1 },
          { text: "Store", id: 2 },
          { text: "Key", id: 3 },
          { text: "Data", id: 4 },
        ],
      },
      {
        question: "Which is used to pass the data from parent to child?",
        rightAnswerId: 4,
        id: 4,
        answers: [
          { text: "State", id: 1 },
          { text: "Components", id: 2 },
          { text: "Render", id: 3 },
          { text: "Props", id: 4 },
        ],
      },
      {
        question: "Who developed React.js?",
        rightAnswerId: 3,
        id: 5,
        answers: [
          { text: "Jordan Lee", id: 1 },
          { text: "Jordan Mike", id: 2 },
          { text: "Jordan Walke", id: 3 },
          { text: "Mark Zuckerberg", id: 4 },
        ],
      }, */
    ],
    loading: true,
  };

  onAnswerClickHandler = (answerId) => {
    //to fix bug if user clicked many times on right answer
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "right") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (answerId === question.rightAnswerId) {
      if (!results[question.id]) {
        results[question.id] = "right";
      }

      this.setState({
        answerState: { [answerId]: "right" },
        results,
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "wrong";
      this.setState({
        answerState: { [answerId]: "wrong" },
        results,
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  repeatHandler = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {}
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`quizes/${this.props.match.params.id}.json`);
      const quiz = response.data;

      this.setState({
        quiz,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>
            How well do you know?
          </h1>

          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRepeat={this.repeatHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              answerState={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
