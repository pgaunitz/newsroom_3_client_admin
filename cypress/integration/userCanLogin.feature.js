describe("User authenticates", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/auth/**",
      response: "fixture:login.json"
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:article_success_message.json"
    });
    cy.visit("/");
  });
  it("successfully with valid credentials", () => {
    cy.get("#new-article-form").should("not.exist");
    cy.get("#login-form").within(() => {
      cy.get("#email").type("admin@times.ma");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Login")
        .click();
    });
    cy.get("#message").should("contain", "Hello admin@times.ma");

    cy.get("#new-article-form").within(() => {
      cy.get("#title-field").type("this is a title");
      cy.get("#snippet-field").type("this is a snippet");
      cy.get("#title-content").type("this is a content");
      cy.get("#category-menu").select("Tech");
      cy.get("#create-article").click();
    });
    cy.get("#response-message").should("contain", "Your article was saved");
  });
});
describe("Journalist cannot create article with invalid credentials", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/**",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:article_error_message.json"
    });
    cy.visit("/");
  });
  it(" with invalid credentials", () => {
    cy.get("#new-article-form").should("not.exist");
    cy.get("#login-form").within(() => {
      cy.get("#email").type(" ");
      cy.get("#password").type("dgsgdg");
      cy.get("button")
        .contains("Login")
        .click();
    });
    cy.get("#new-article-form").should("not.exist");
  });
});
