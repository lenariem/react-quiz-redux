import React, { Component } from 'react'
import './Drawer.css'
import Backdrop from "../../UI/Backdrop/Backdrop"
import { NavLink } from 'react-router-dom'

const links = [
    {to: '/', label: 'Quizzes List', exact: true},
    {to: '/auth', label: 'Log in', exact: false},
    {to: '/quiz-creator', label: 'Create Quiz', exact: false},
]

export default class Drawer extends Component {

    clickHandler = () => this.props.onClose()

    renderLinks() {
        return links.map((link, i) => {
            return (
                <li key={i}>
                   <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName="active"
                        onClick={this.clickHandler}
                   > {link.label} </NavLink>
                </li>
            )
        })
    }
    render() {
        let cls
        if(!this.props.isOpen) {
           cls = 'close'
        }

        return (
            <>  
                <nav className={"Drawer " + cls}>
                    <ul>
                    {this.renderLinks()} 
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>
        )
    }
}
