import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogout, onLogin } from "../modules/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector(state => state.state.auth.authenticated);
  let login;
  if (authenticated) {
    login = <button onClick={() => onLogout(dispatch)}>Logout</button>;
  } else {
    login = (
      <form onSubmit={event => onLogin(event, dispatch)} id="login-form">
        <label>Email</label>
        <input name="email" type="email" id="email"></input>

        <label>Password</label>
        <input name="password" type="password" id="password"></input>

        <button id="login" type="submit">
          Login
        </button>
      </form>
    );
  }

  return { login };
};

export default  LoginForm;
