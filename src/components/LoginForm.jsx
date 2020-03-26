import React from "react";
import auth from "../modules/auth";
import { connect } from "react-redux";
import { AUTHENTICATE } from "../state/actions/actionTypes";

const LoginForm = props => {

  const onLogin = async e => {
    try {
      e.preventDefault();
      debugger
      let response = await auth.signIn(
        e.target.elements.email.value,
        e.target.elements.password.value
      );
      debugger
      props.dispatch({
        type: AUTHENTICATE,
        payload: { authenticated: true, userEmail: response.data.email }
      });
    } catch (error) {
      console.log(error);
    }
  };
  let login;

  if (props.authenticated) {
    login = (
      <>
        <p id='message'>Hello {props.userEmail}</p>
        {/* <button onClick={onLogout}>Logout</button> */}
      </>
    );
  } else {
    login = (
      <form id='login-form' onSubmit={onLogin}>
        <input id='email' name="email" placeholder="Email" />
        <input id='password'name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    );
  }
  return <div>{login}</div>;
};

const mapStateToProps = state => {
  return {
    userEmail: state.userEmail,
    authenticated: state.authenticated
  };
};
export default connect(mapStateToProps)(LoginForm);
