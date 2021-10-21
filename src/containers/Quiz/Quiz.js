import React, { Component } from "react";
import "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import { fetchQuizByID } from "../../store/actions/quiz";


export class Quiz extends Component {
  
  onAnswerClickHandler = (answerId) => {
    //to fix bug if user clicked many times on right answer
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "right") {
        return;
      }
    }

    const question = this.props.quiz[this.props.activeQuestion];
    const results = this.props.results;

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

  componentDidMount() {
    this.props.fetchQuizByID(this.props.match.params.id);
  }

  render() {
    return (
      <div className="Quiz">
        <div className="QuizWrapper">
          <h1>
            How well do you know?
          </h1>

          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRepeat={this.repeatHandler}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results, 
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, 
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizByID: id => dispatch(fetchQuizByID(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
