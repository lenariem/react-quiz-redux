import axios from "../../axios/axios-quiz";
import {
  FETCH_QUIZZES_ERROR,
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizzes() {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get("quizes.json");
      const quizzes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Quiz #${index + 1}`,
        });
      });

      dispatch(fetchQuizzesSuccess(quizzes));
    } catch (error) {
      dispatch(fetchQuizzesError(error));
    }
  };
}

export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START,
  };
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    quizzes,
  };
}

export function fetchQuizzesError(error) {
  return {
    type: FETCH_QUIZZES_ERROR,
    error,
  };
}

export function fetchQuizByID(quizID) {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());

    try {
      const response = await axios.get(`quizes/${quizID}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizzesError(error));
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  }
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    //to fix bug if user clicked many times on right answer
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "right") {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (answerId === question.rightAnswerId) {
      if (!results[question.id]) {
        results[question.id] = "right";
      }

      dispatch(quizSetState({[answerId]: "right"}, results));
      /*  this.setState({
        answerState: { [answerId]: "right" },
        results,
      }); */

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
          /*  this.setState({
            isFinished: true,
          }); */
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
          /* this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          }); */
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "wrong";

      dispatch(quizSetState({[answerId]: "wrong"}, results));
      /* this.setState({
        answerState: { [answerId]: "wrong" },
        results,
      }); */
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

