import axios from '../../axios/axios-quiz';
import { FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS, FETCH_QUIZ_SUCCESS } from "./actionTypes";

export function fetchQuizzes() {
  return async dispatch => {
      dispatch(fetchQuizzesStart())
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
        type: FETCH_QUIZZES_START
    }
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    }
}

export function fetchQuizzesError(error) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error 
    }
} 

export function fetchQuizByID(quizID) {
  return async dispatch => {
    dispatch(fetchQuizzesStart());

    try {
      const response = await axios.get(`quizes/${quizID}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz))
    } catch (error) {
      dispatch(fetchQuizzesError(error));
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}