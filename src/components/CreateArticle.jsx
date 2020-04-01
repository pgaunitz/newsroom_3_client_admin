import React, { Component } from "react";
import axios from "axios";
import { Checkbox, Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import ImageUploading from "react-images-uploading";

class CreateArticle extends Component {
  state = {
    message: "",
    image: []
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
          premium: premium,
          image: this.state.image
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

  onImageDropHandler = imageList => {
    if (imageList.length > 0) {
      this.setState({
        image: imageList[0].dataURL
      })
    }
  }

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
            options={categoryOptions}
            onChange={(event, data) => {
              this.handleCategoryChange(data.value);
            }}
            label="Categories"
            key="category"
            width={6}
          />
          <Checkbox label="Premium Article" name="premium" id="premium" />
          
          <ImageUploading onChange={this.onImageDropHandler}>
            {({ imageList, onImageUpload }) => (
              <div className="upload__image-wrapper">
                <Button id="image-uploader" onClick={onImageUpload}>
                  Upload Images
                </Button>
                &nbsp;
                {imageList.map(image => (
                  <div key={image.key} className="image-item">
                    <img src={image.dataURL} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <Button
                        size="tiny"
                        id="image-update"
                        onClick={() => {
                          image.onUpdate();
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        id="image-remove"
                        size="tiny"
                        onClick={image.onRemove}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
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
