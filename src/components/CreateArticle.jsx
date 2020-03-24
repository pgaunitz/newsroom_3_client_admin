import React, { Component } from 'react'

class CreateArticle extends Component {
  render() {
    return (
      <>
      <form
       onSubmit= {this.submitArticle}
      >
        <input  name="title" placeholder = "Title"/>
        <input name = "snippet" placeholder = "Snippet"/>
        <input name = "content" placeholder = "Content" />
      </form>
      <button type="submit">Create Article</button>
      </>
    )
  }
}

export default CreateArticle
