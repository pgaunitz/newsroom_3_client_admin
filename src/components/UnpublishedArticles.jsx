import React from "react";
import { connect } from "react-redux";

const DisplayArticles = props => {
  
  let articleDisplay = props.articles.map(article => {
    return (
      <div id={`article-${article.id}`} key={article.id}>
        <img src={article.image} alt={`${article.title}-image`} />
        <h4 id="title">{article.title}</h4>
        <h5 id="snippet">{article.snippet}</h5>
        <p id="content">{article.content}</p>
      </div>
    );
  });
  return <div id="article-list">{articleDisplay}</div>;
};

const mapStateToProps = state => {
  return {
    articles: state.articles,
  };
};

export default connect(mapStateToProps)(DisplayArticles);
