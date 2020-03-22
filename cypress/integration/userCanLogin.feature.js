describe("User authenticates", () => {
    beforeEach(() => {
        cy.server();
    });

it("successfully with valid credentials", () => {
    cy.route({
        method: 'POST',
        url: "http://localhost:3000/api/v1/auth/sign_in",
        response: 'fixture:login.json',
        headers: {
            uid: 'admin@times.ma'
        }
    });
    cy.visit("/");
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
        cy.get("#email").type("admin@times.ma");
        cy.get("#password").type("password");
        cy.get('button').contains('Submit').click()
    });
    cy.get("#message").should("contain", "Hi admin@times.ma");
});

it("unsuccessfully with invalid credentials", () => {
    cy.route({
        method: 'POST',
        url:  "http://localhost:3000/api/v1/auth/sign_in",
        status: "401",
        response: {
            errors: ['Invalid login credentials. Please try again.'],
            success: false
        }
    });
    cy.visit("/");
    cy.get("#login").click();
    cy.get("#login-form").within(() => {
        cy.get("#email").type("admin@times.ma");
        cy.get("#password").type("wrongpassword");
        cy.get('button').contains('Submit').click()
    });
    cy.get("#message").should("contain", "Invalid login credentials.")
    });
});