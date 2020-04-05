import React from "react";
import CreateArticle from "./components/CreateArticle";
import LoginForm from "./components/LoginForm";
import { connect } from "react-redux";
import Header from "./components/Header";
import UnpublishedArticles from "./components/UnpublishedArticles";
import { fetchArticles } from "./state/actions/articleAction";
import { bindActionCreators } from "redux";
import mars_times from "./assets/mars_times.png"

const App = (props) => {
  props.fetchArticles();
  let userRole = props.currentUser.role;
  let showContent =
    userRole === "journalist" ? <CreateArticle /> : <UnpublishedArticles />;
  return (
    <div>
      <Header />
<img id="background" src={mars_times} alt="background" />
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
