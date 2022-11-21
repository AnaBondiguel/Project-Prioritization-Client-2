describe("New Ticket page", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.contains("a", "New Ticket").click();
  });

  // field not valid
  it("clear the field will get warning", () => {
    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="email"]').type("user1@");
    cy.wait(2000);
    cy.contains("button", "Save details").click();
    cy.contains("Fields can't be blank");
    cy.contains("invalid email address");
  });

  // edit success
  it("edit success and jump to home page", () => {
    cy.get('input[name="firstName"]').clear().type("user1");
    cy.contains("button", "Save details").click();
    // succes nv back to home page
    cy.location("pathname").should("eq", "/mytickets");
  });
});
