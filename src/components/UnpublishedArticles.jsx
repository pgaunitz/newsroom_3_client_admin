import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";

const DisplayArticles = props => {
  
  let articleDisplay = props.articles.map(article => {
    return (
      <>
      <h1 id="main-title">Unpublished Articles</h1>
      <div id={`article-${article.id}`} key={article.id}>
        <img src={article.image} alt={`${article.title}-image`} />
        <h4 id="title">{article.title}</h4>
        <h5 id="snippet">{article.snippet}</h5>
        <p id="content">{article.content}</p>
        <Button animated size='massive' id="publish-button">
      <Button.Content visible  >Publish</Button.Content>
      <Button.Content hidden>
        <Icon name='paper plane' />
      </Button.Content>
      </Button>
      </div>
      </>
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
