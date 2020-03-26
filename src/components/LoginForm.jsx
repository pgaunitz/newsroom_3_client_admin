import React from "react";
import auth from "./modules/auth";
import { connect } from "react-redux";
import { bindActionCreators} from "redux"

const LoginForm = props =>  {
 const onLogin = (email, password) => (
 props.authentication(email, password)
 )
  onLogout = () => {
    auth.signOut();

    this.props.dispatch({
      type: "AUTHENTICATE",
      payload: { authenticated: false, userEmail: null }
    });
  };

  
    let login;

    if (this.props.authenticated) {
      login = (
        <>
          <p>Hello {this.props.userEmail}</p>
          <button onClick={this.onLogout}>Logout</button>
        </>
      );
    } else {
      login = (
        <form onSubmit={() => onLogin (email.value, password.value)}>
          <input name="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      );
    }
    return <div>{login}</div>;
  
}
const mapStateToProps = state => {
  return {
    userEmail: state.auth.userEmail,
    authenticated: state.auth.authenticated
  };
};
export default connect(mapStateToProps)(LoginForm);
