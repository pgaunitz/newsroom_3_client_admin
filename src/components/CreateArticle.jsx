import React, { Component } from "react";
import axios from "axios";
import { Checkbox, Button, Form } from "semantic-ui-react";
import {connect} from 'react-redux'

class CreateArticle extends Component {
  state = {
    message: "",
  };
  createArticle = async event => {
    event.preventDefault();
    let premium;
    if (event.target.premium.checked === true) {
      premium = true;
    } else {
      premium = false;
    }

    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.post(
      "/articles",
      {
        article: {
          title: event.target.title.value,
          snippet: event.target.snippet.value,
          content: event.target.content.value,
          category: this.state.selectedCategory,
          premium: premium
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
  handleCategoryChange = value => {
    this.setState({
      selectedCategory: value
    });
  };

  render() {
    let categoryOptions = [
      { key: "latest_news", text: "Latest News", value: "latest_news" },
      { key: "Tech", text: "Tech", value: "tech" },
      { key: "Sports", text: "Sports", value: "sports" },
      { key: "Politics", text: "Politics", value: "politics" },
      { key: "Culture", text: "Culture", value: "culture" }
    ];
    return (
      <>
        <Form id="new-article-form" onSubmit={this.createArticle}>
          <Form.Input id="title-field" name="title" placeholder="Title" />
          <Form.Input id="snippet-field" name="snippet" placeholder="Snippet" />
          <Form.TextArea
            id="title-content"
            name="content"
            placeholder="Content"
          />
          <Form.Select
            id="category-menu"
            name="category"
            id="category"
            options={categoryOptions}
            onChange={(event, data) => {
              this.handleCategoryChange(data.value);
            }}
            label="Categories"
            key="category"
            name="category"
            width={6}
          />
          <Checkbox label="Premium Article" name="premium" id="premium" />
          <Button id="create-article" type="submit">
            Create Article
          </Button>
        </Form>
        <p id="response-message">{this.state.message}</p>
      </>
    );
  }
}


export default connect()(CreateArticle);
