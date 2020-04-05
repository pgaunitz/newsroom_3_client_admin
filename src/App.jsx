import React from "react";
import CreateArticle from "./components/CreateArticle";
import LoginForm from "./components/LoginForm";
import { connect } from "react-redux";
import Header from "./components/Header";
import UnpublishedArticles from "./components/UnpublishedArticles";
import { fetchArticles } from "./state/actions/articleAction";
import { bindActionCreators } from "redux";

const App = (props) => {
  props.fetchArticles();
  let userRole = props.currentUser.role;
  let showContent =
    userRole === "journalist" ? <CreateArticle /> : <UnpublishedArticles />;
  return (
    <div>
      <Header />

      <LoginForm />
      {props.authenticated && showContent}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    currentUser: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: bindActionCreators(fetchArticles, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
