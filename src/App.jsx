import React, { Component } from "react";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/authentication";

class App extends Component {
  state = {
    renderLoginForm: false,
    authenticated: false,
    message: ""
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
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    switch (true) {
      case renderLoginForm && authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <button
              id="login"
              onclick={() => this.setState({ renderloginForm: true })}
            >
              Login
            </button>
            <p>{message}</p>
          </>
        );
        break;
      case authenticated:
        renderLogin = (
          <p> Hi {JSON.parse(sessionStorage.getItem("credentials")).uid}</p>
        );
        break;
    }

    return (
      <>
        <LoginForm onChangeHandler={this.onChangeHandler} />
        {renderLogin}
      </>
    );
  }
}

export default App;
