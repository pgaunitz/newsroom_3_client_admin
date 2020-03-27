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
    cy.visit("/");
  });

  it ("create article form is not visible before authenticated", () => {
    cy.get("#new-article-form").should("not.exist")
  })

  it("successfully with valid credentials", () => {
    cy.get("#login-form").within(() => {
      cy.get("#email").type("admin@times.ma");
      cy.get("#password").type("password");
      cy.get("button")
        .contains("Login")
        .click();
    });
    cy.get("#message").should("contain", "Hello admin@times.ma");
  });

  it ("renders create article form when logged in", () => {
    cy.get("#new-article-form").should("exist")
  })
});
