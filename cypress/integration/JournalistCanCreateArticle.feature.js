describe("journalist successfully creates article", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:success_message.json"
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

