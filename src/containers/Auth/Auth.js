import React, { Component } from "react";
import "./Auth.css";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Please, enter a valid email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Password",
        errorMessage:
          "Please, enter a valid password: min 6 and max 30 characters",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
          maxLength: 30,
        },
      },
    },
  };

  loginHandler = () => {
    this.props.auth(
     this.state.formControls.email.value,
     this.state.formControls.password.value,
     true
    );
    /* const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBbuTolCp83hQuOf4nZwknRmRPXbkEvmZs', authData);
      console.log(response.data);
    } catch(error) {
      console.log(error);
    } */
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
     );
    /* const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBbuTolCp83hQuOf4nZwknRmRPXbkEvmZs', authData);
      console.log(response.data);
    } catch(error) {
      console.log(error);
    } */
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (e, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, i) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + i}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(e) => this.onChangeHandler(e, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Log in</h1>
          <form onSubmit={this.submitHandler} className="AuthForm">
            {this.renderInputs()}

            <Button
              disabled={!this.state.isFormValid}
              type="rightBtn"
              onClick={this.loginHandler}
            >
              Log in
            </Button>

            <Button
              disabled={!this.state.isFormValid}
              type="primaryBtn"
              onClick={this.registerHandler}
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth);