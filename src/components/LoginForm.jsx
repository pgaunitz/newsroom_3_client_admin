import React from "react";
import auth from "../modules/auth";
import { connect } from "react-redux";
import { AUTHENTICATE } from "../state/actions/actionTypes";

const LoginForm = props => {
  const onLogin = async e => {
    try {
      e.preventDefault();

      let response = await auth.signIn(
        e.target.elements.email.value,
        e.target.elements.password.value
      );

      props.dispatch({
        type: AUTHENTICATE,
        payload: { currentUser: { email: response.data.email, role: response.data.role} }
      });
    } catch (error) {
      console.log(error);
    }
  };
  let login;

  if (props.authenticated) {
    login = (
      <>
        <h2 id="message">Hello {props.currentUser.email}</h2>
      </>
    );
  } else {
    login = (
      <form id="login-form" onSubmit={onLogin}>
        <input id="email" name="email" placeholder="Email" />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    );
  }
  return <div>{login}</div>;
};

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    authenticated: state.authenticated
  };
};
export default connect(mapStateToProps)(LoginForm);
