import React from "react";
import CreateArticle from "./components/CreateArticle";
import LoginForm from "./components/LoginForm";
import { connect } from "react-redux";
import Header from "./components/Header";

const App = props => {
  return (
    <div>
      <Header/>
      <LoginForm />
      {props.authenticated && <CreateArticle />}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps)(App);
