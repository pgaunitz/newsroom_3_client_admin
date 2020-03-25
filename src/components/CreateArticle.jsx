import React, { Component } from "react";
import axios from "axios";

class CreateArticle extends Component {
  state = {
    message: ""
  };

  createArticle = async event => {
    event.preventDefault();
    let response = await axios.post(
      "/articles",
      {
        article: {
          title: event.target.elements.title.value,
          snippet: event.target.elements.snippet.value,
          content: event.target.elements.content.value
        }
      },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.status === 200) {
      this.setState({ message: response.data.message });
    } else {
      this.setState({ message: response.data.message });
    }
  };

  render() {
    return (
      <>
        <form id="new-article-form" onSubmit={this.createArticle}>
          <input id="title-field" name="title" placeholder="Title" />
          <input id="snippet-field" name="snippet" placeholder="Snippet" />
          <textarea id="title-content" name="content" placeholder="Content" />
          <button id="create-article" type="submit">
            Create Article
          </button>
        </form>
        <p id="message">{this.state.message}</p>
      </>
    );
  }
}

export default CreateArticle;
