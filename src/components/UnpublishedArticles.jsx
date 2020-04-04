import React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import axios from 'axios'
import { useState } from 'react'

const DisplayArticles = props => {

  const [message, setMessage] = useState("");

  const onPublish = async (articleID) => {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    debugger
    let response = await axios.put(
      `/admin/${articleID}`,
      {
        article: {
          published: true,
        },
      },
      { headers: headers }
    );
    if (response.status === 200) {
      setMessage({ message: response.data.message });
    } else {
      setMessage({ message: response.data.error });
    }
  }; 
  
  let articleDisplay = props.articles.map(article => {
    return (
      <>
        <h1 id="main-title">Unpublished Articles</h1>
        <div id={`article-${article.id}`} key={article.id}>
          <img src={article.image} alt={`${article.title}-image`} />
          <h4 id="title">{article.title}</h4>
          <h5 id="snippet">{article.snippet}</h5>
          <p id="content">{article.content}</p>
          <Button
            animated
            size="large"
            id="publish-button"
            onClick={() => {onPublish(article.id)}}
          >
            <Button.Content visible>Publish</Button.Content>
            <Button.Content hidden>
              <Icon name="paper plane" />
            </Button.Content>
          </Button>
        </div>
        <p id='message' key={article.id}>{message}</p>
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
