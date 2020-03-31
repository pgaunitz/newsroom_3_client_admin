import React, { Component } from "react";
import axios from "axios";

class CreateArticle extends Component {
  state = {
    message: ""
  };

  createArticle = async event => {
    event.preventDefault();
    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"))
    let response = await axios.post(
      "/articles",
      {
        article: {
          title: event.target.title.value,
          snippet: event.target.snippet.value,
          content: event.target.content.value,
          category: event.target.category.value
        }
      },
      { headers: headers }
    );

    if (response.status === 200) {
      this.setState({ message: response.data.message });
    } else {
      this.setState({ message: response.data.error });
    }
  };

  render() {
    return (
      <>
        <form id="new-article-form" onSubmit={this.createArticle}>
          <input id="title-field" name="title" placeholder="Title" />
          <input id="snippet-field" name="snippet" placeholder="Snippet" />
          <textarea id="title-content" name="content" placeholder="Content" />
          <select id="category-menu" name="category">
            <option value="latest_news">Latest news</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
            <option value="politics">Politics</option>
            <option value="culture">Culture</option>
          </select>
          <button id="create-article" type="submit">
            Create Article
          </button>
        </form>
        <p id="response-message">{this.state.message}</p>
      </>
    );
  }
}

export default CreateArticle;
