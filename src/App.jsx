import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/authentication";

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    message: "welcome back"
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = async e => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({
        message: "invalid login credentials, please try again",
        renderLoginForm: false
      });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLogin && !authenticated:
        return (
          <>
            <LoginForm onChangeHandler={this.onChangeHandler} />
            {renderLogin}
            {this.state.authenticated === true && message}
          </>
        );
    }
  }
}

export default App;
