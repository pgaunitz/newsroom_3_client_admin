import React, { useState } from "react";
import axios from "axios";
import { Checkbox, Button, Form } from "semantic-ui-react";
import ImageUploading from "react-images-uploading";


const CreateArticle = () => {
  const [message, setMessage] = useState("");
  const [selectedCategory, setCategory] = useState("");
  const [image, setImage] = useState([]);
  const createArticle = async (event) => {
    debugger
    event.preventDefault();
    let selectPremium =
      event.target.premium.checked === true
        ? true
        : false

    let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
    let response = await axios.post(
      "/admin",
      {
        article: {
          title: event.target.title.value,
          snippet: event.target.snippet.value,
          content: event.target.content.value,
          category: selectedCategory,
          premium: selectPremium,
          image: image,
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
  
  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const onImageDropHandler = (imageList) => {
    if (imageList.length > 0) {
      setImage(imageList[0].dataURL);
    }
  };

  let categoryOptions = [
    { key: "latest_news", text: "Latest News", value: "latest_news" },
    { key: "Tech", text: "Tech", value: "tech" },
    { key: "Sports", text: "Sports", value: "sports" },
    { key: "Politics", text: "Politics", value: "politics" },
    { key: "Culture", text: "Culture", value: "culture" },
  ];
  return (
    <>
      <Form id="new-article-form" onSubmit={createArticle}>
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
            handleCategoryChange(data.value);
          }}
          label="Categories"
          key="category"
          width={6}
        />
        <Checkbox label="Premium Article" name="premium" id="premium" />

        <ImageUploading onChange={onImageDropHandler}>
          {({ imageList, onImageUpload }) => (
            <div className="upload__image-wrapper">
              <Button type="button" id="image-uploader" onClick={onImageUpload}>
                Upload Images
              </Button>
              &nbsp;
              {imageList.map((image) => (
                <div key={image.key} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <Button
                      type="button"
                      size="tiny"
                      id="image-update"
                      onClick={() => {
                        image.onUpdate();
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      type="button"
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
      <p id="response-message">{message}</p>
    </>
  );
};

export default CreateArticle;


