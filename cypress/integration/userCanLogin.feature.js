describe("User authenticates", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://newsroom3api.herokuapp.com/api/v1/auth/sign_in",
      response: "fixture:login.json"
    });
    cy.route({
      method: "GET",
      url: "https://newsroom3api.herokuapp.com/api/v1/auth/**",
      response: "fixture:login.json"
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
    cy.get("#new-article-form").should("exist");
  });
});
describe("Journalist cannot create article with invalid credentials", () => {
  before(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "https://newsroom3api.herokuapp.com/api/v1/auth/**",
      status: "401",
      response: {
        errors: ["Invalid login credentials. Please try again."],
        success: false
      }
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
