import React from "react";
import useCreateArticle from "../helpers/createArticleHook";
import { Checkbox, Button, Form, Modal } from "semantic-ui-react";
import ImageUploading from "react-images-uploading";
import { connect } from "react-redux";
import { SHOW_PUBLISH_MESSAGE } from "../state/actions/actionTypes";

const CreateArticle = props => {
  const [
    categoryOptions,
    handleCategoryChange,
    message,
    onImageDropHandler,
    createArticle
  ] = useCreateArticle();

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
              <Button
                inverted
                color="blue"
                type="button"
                id="image-uploader"
                onClick={onImageUpload}
              >
                Upload Images
              </Button>
              &nbsp;
              {imageList.map(image => (
                <div key={image.key} className="image-item">
                  <img src={image.dataURL} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <Button
                      inverted
                      color="blue"
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
                      inverted
                      color="blue"
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
        <Button
          inverted
          color="blue"
          id="create-article"
          type="submit"
          onClick={() =>
            props.dispatch({
              type: SHOW_PUBLISH_MESSAGE,
              payload: { showMessage: true }
            })
          }
        >
          Create Article
        </Button>
      </Form>
      {props.showMessage && (
        <Modal open={message !== ""}>
          <h2 id="response-message">{message}</h2>
          <Button
            inverted
            color="blue"
            type="close"
            onClick={() =>
              props.dispatch({
                type: SHOW_PUBLISH_MESSAGE,
                payload: { showMessage: false }
              })
            }
          >
            <i class="x icon" />
          </Button>
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    showMessage: state.showMessage
  };
};

export default connect(mapStateToProps)(CreateArticle);
