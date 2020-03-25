import React, { Component } from "react";
import { submitArticle } from "../modules/articleRequest";

class CreateArticle extends Component {
  state = {
    message: ""
  };

  createArticle = async event => {
    event.preventDefault();
    let response = await submitArticle(
      event.target.elements.title.value,
      event.target.elements.snippet.value,
      event.target.elements.content.value
    );

    if (response.status === 200) {
      debugger;
      this.setState({ message: response.data.message });
    } else {
      debugger;
      this.setState({ message: response.data.message });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.createArticle}>
          <input name="title" placeholder="Title" />
          <input name="snippet" placeholder="Snippet" />
          <input name="content" placeholder="Content" />
          <button type="submit">Create Article</button>
        </form>
        <p>{this.state.message}</p>
      </>
    );
  }
}

export default CreateArticle;
