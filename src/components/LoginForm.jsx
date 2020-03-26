import React from "react";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch
  let login 
  login = (
  <form onSubmit={ event => onLogin( event, dispatch ) } id="login-form">
  <label>Email</label>
  <input name="email" type="email" id="email"></input>

  <label>Password</label>
  <input name="password" type="password" id="password"></input>

  <button id="login" type="submit">Login</button>
</form>
  )
  return (
   {login}
  );
};

export default  LoginForm;