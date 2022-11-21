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
    cy.get('input[name="initialtive"]').clear();
    cy.get('textarea[name="description"]').clear();
    cy.wait(2000);
    cy.contains("button", "Save").click();
    cy.contains("Fields can't be blank");
    cy.contains("Descrpition length is between 5-200");
    cy.contains("Title length is between 5-30");
    cy.wait(2000);
  });

  // edit success
 it("New ticket success", () => {
    cy.get('input[name="initialtive"]').type("Cypress Test");
    cy.get('textarea[name="description"]').type("This is Cypress Test");
    cy.wait(2000);
    cy.contains("button", "Save").click();
    cy.location("pathname").should("eq", "/mytickets");
  });
});
