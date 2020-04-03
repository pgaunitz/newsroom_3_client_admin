describe("successfully displays", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "https://newsroom3api.herokuapp.com/api/v1/admin",
      response: "fixture:articles.json"
    });
    cy.visit("/");
    cy.window().then(window => {
      window.store.dispatch({
        type: "AUTHENTICATE",
        payload: { currentUser: { email: "editor@mail.com", role: "editor" } }
      });
    });
  });

  it("first article", () => {
    cy.get("#title").should("contain", "Unpublished Articles");
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
    });
  });

  it("second article", () => {
    cy.get("#article-2").within(() => {
      cy.get("#title").should("contain", "Lau new president");
      cy.get("img").should("exist");
      cy.get("#snippet").should("contain", "Mars wants Lau on the front line");
      cy.get("#content").contains(
        "And this might be the end before the biginning for Mars."
      );
    });
  });
});
