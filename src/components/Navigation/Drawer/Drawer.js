import React, { Component } from "react";
import "./Drawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

export default class Drawer extends Component {
  clickHandler = () => this.props.onClose();

  renderLinks(links) {
    return links.map((link, i) => {
      return (
        <li key={i}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName="active"
            onClick={this.clickHandler}
          >
            {" "}
            {link.label}{" "}
          </NavLink>
        </li>
      );
    });
  }
  render() {
    let cls;
    if (!this.props.isOpen) {
      cls = "close";
    }

    const links = [
      { to: "/", label: "Quizzes List", exact: true }
    ];

    if(this.props.isAuthenticated) {
        links.push( { to: "/quiz-creator", label: "Create Quiz", exact: false })
        links.push( { to: "/logout", label: "Logout", exact: false })
    } else {
        links.push(  { to: "/auth", label: "Log in", exact: false })
    }

    return (
      <>
        <nav className={"Drawer " + cls}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}
