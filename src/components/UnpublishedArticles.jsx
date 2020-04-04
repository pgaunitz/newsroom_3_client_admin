import React from "react";
import { connect } from "react-redux";
import { Button, Icon, Modal } from "semantic-ui-react";
import axios from "axios";
import { useState } from "react";
import { SHOW_PUBLISH_MESSAGE } from "../state/actions/actionTypes";

const DisplayArticles = (props) => {
  const [message, setMessage] = useState("");

  const onPublish = async (articleID) => {
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    debugger;
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
      setMessage(response.data.message);
    } else {
      setMessage(response.data.error);
    }
  };
  let closeModal;

  let articleDisplay = props.articles.map((article) => {
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
            onClick={() => {
              onPublish(article.id) &&
                props.dispatch({
                  type: SHOW_PUBLISH_MESSAGE,
                  payload: { showMessage: true },
                });
            }}
          >
            <Button.Content visible>Publish</Button.Content>
            <Button.Content hidden>
              <Icon name="paper plane" />
            </Button.Content>
          </Button>
          {props.showMessage && (
            <Modal open={message != ""}>
              <h2 id="message">{message}</h2>
              <Button
                type="close"
                onClick={() =>
                  props.dispatch({
                    type: SHOW_PUBLISH_MESSAGE,
                    payload: { showMessage: false },
                  })
                }
              >
                <i class="thumbs up icon" />
              </Button>
            </Modal>
          )}
        </div>
      </>
    );
  });
  return (
    <>
      <div id="article-list">{articleDisplay}</div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    showMessage: state.showMessage,
  };
};

export default connect(mapStateToProps)(DisplayArticles);
