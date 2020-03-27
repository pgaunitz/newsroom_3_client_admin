import React from "react";
import CreateArticle from "./components/CreateArticle";
import LoginForm from "./components/LoginForm";
import { connect } from "react-redux";

const App = props => {
  return (
    <div>
      <LoginForm />
      {props.authenticated && <CreateArticle />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};

export default connect(mapStateToProps)(App);
