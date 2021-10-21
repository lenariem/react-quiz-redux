import React, { Component } from "react";
import "./QuizList.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {

  state = {
    quizzes: [] ,
    loading: true
  }

  renderQuizzes() {
    return this.state.quizzes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get("quizes.json");
      const quizzes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          name: `Quiz #${index + 1}`
        });
      });

      this.setState({
        quizzes,
        loading: false
      });

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="QuizList">
        <div>
          <h1>Quiz List</h1>

          { 
            this.state.loading
            ? <Loader />
            : <ul>{this.renderQuizzes()}</ul>
          } 
         
        </div>
      </div>
    );
  }
}
