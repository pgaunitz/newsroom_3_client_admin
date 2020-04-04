describe('editor can successfully publish an article', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "PUT",
      url: "https://newsroom3api.herokuapp.com/api/v1/admin/**",
      response: {message: "Article is published"}
    });
    cy.route({
      method: "GET",
      url: "https://newsroom3api.herokuapp.com/api/v1/admin",
      response: "fixture:unpublished_articles.json"
    });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: { currentUser: { email: "editor@mail.com", role: "editor" } }
      });
    });
  });
  it('editor can publish article', () => {
    cy.get("#main-title").should("contain", "Unpublished Articles");
    cy.get("#article-1").within(() => {
      cy.get("#title").should("contain", "Zero infected on Mars");
      cy.get("img").should("exist");
      cy.get("#snippet").should(
        "contain",
        "Mars becomes more and more desirable as Earth is struggling with Corona Virus"
      );
      cy.get("#content").contains(
        "Scientist say that we can live there in the nearest future. Spaceships are now being prepared to ship shitloads of people."
      );
      cy.get("#publish-button").click();
    });
  });
})
