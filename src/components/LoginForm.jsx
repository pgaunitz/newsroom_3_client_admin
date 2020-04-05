import React from "react";
import auth from "../modules/auth";
import { connect } from "react-redux";
import { AUTHENTICATE } from "../state/actions/actionTypes";
import { Form, Button } from "semantic-ui-react";

const LoginForm = (props) => {
  const onLogin = async (e) => {
    try {
      e.preventDefault();

      let response = await auth.signIn(
        e.target.elements.email.value,
        e.target.elements.password.value
      );

      props.dispatch({
        type: AUTHENTICATE,
        payload: {
          currentUser: { email: response.data.email, role: response.data.role },
        },
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
      <Form id="login-form" onSubmit={onLogin}>
        <Form.Input
          id="email"
          name="email"
          placeholder="Email"
          fluid
          label="Email"
        />
        <Form.Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          fluid
          label="Password"
        />
        <Button inverted color = "blue"
        type="submit">Login</Button>
      </Form>
    );
  }
  return <div>{login}</div>;
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    authenticated: state.authenticated,
  };
};
export default connect(mapStateToProps)(LoginForm);
