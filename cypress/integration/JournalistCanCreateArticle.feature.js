describe("journalist can creates article", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:article_success_message.json"
    });
    cy.visit("/");
  });

  it("succefully creates first article", () => {
    cy.get("#new-article-form").within(() => {
      cy.get("#title-field").type("this is a title");
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("#create-article").click();
    });
    cy.get("#message").should("contain", "Your article was saved");
  });
});

describe("journalist can not create emty article", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:article_error_message.json"
    });
    cy.visit("/");
  });

  it("can not create article without title", () => {
    cy.get("#new-article-form").within(() => {
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("#create-article").click();
    });
    cy.get("#message").should("contain", "Title can't be blank");
  });
});
