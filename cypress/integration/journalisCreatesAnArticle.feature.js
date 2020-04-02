describe("journalist can creates article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://newsroom3api.herokuapp.com/api/v1/articles",
      response: "fixture:article_success_message.json"
    });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          currentUser: "admin@times.ma",
          role: "journalist"
        }
      });
    });
  });

  it("authenticated user succefully creates first article", () => {
    const imageFileName = "img.jpg";
    cy.get("#new-article-form").within(() => {
      cy.get("#title-field").type("this is a title");
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("div[name='category']").click();
      cy.get('div[role="option"]')
        .contains("Tech")
        .click();
      cy.get("#premium").check({ force: true });
      cy.file_upload('img.jpg', "#image-uploader", 'image/jpg');
      cy.get("#create-article").click();
    });
    cy.get("#response-message").should("contain", "Your article was saved");
  });
});

describe("journalist can not create emty article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://newsroom3api.herokuapp.com/api/v1/articles",
      response: "fixture:article_error_message.json"
    });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          currentUser: "admin@times.ma",
          role: "journalist"
        }
      });
    });
  });

  it("can not create article without title", () => {
    cy.get("#new-article-form").within(() => {
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("div[name='category']").click();
      cy.get('div[role="option"]')
        .contains("Tech")
        .click();
      cy.get("#create-article").click();
    });
    cy.get("#response-message").should("contain", "Title can't be blank");
  });
});

describe("user who is not a journalist", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://newsroom3api.herokuapp.com/api/v1/articles",
      response: { message: "You are not authorized to create an article" }
    });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          currentUser: "user@mail.com",
          role: "reg_user"
        }
      });
    });
  });

  it("can not create article without title", () => {
    cy.get("#new-article-form").within(() => {
      cy.get("#title-field").type("this is a title");
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("div[name='category']").click();
      cy.get('div[role="option"]')
        .contains("Tech")
        .click();
        cy.get('#image-uploader').click()
      cy.get("#create-article").click();
    });
    cy.get("#response-message").should(
      "contain",
      "You are not authorized to create an article"
    );
  });
});
