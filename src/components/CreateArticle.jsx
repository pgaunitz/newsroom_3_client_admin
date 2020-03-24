import React, { Component } from 'react';
import { submitArticle } from "../modules/articleRequest"

class CreateArticle extends Component {
  
  createArticle = async event => {
    event.preventDefault()
    let response = await submitArticle(
      event.target.elements.title.value,
      event.target.elements.snippet.value,
      event.target.elements.content.value
    )
  }

  render() {
    return (
      <>
      <form
       onSubmit= {this.createArticle}
      >
        <input  name="title" placeholder = "Title"/>
        <input name = "snippet" placeholder = "Snippet"/>
        <input name = "content" placeholder = "Content" />
        <button type="submit">Create Article</button>
      </form>
      </>
    )
  }
}

export default CreateArticle;
