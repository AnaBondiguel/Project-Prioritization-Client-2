import Cypress from "cypress"

Cypress.Commands.add("userlogin", () => {
  cy.visit("localhost:3000/signin");
  cy.get('input[name="email"]').type("user1@gmail.com");
  cy.get('input[name="password"]').type("test@123");
  cy.contains("button", "Sign In").click();
});

Cypress.Commands.add("managerlogin", () => {
  cy.visit("localhost:3000/signin");
  cy.get('input[name="email"]').type("ana@test.com");
  cy.get('input[name="password"]').type("test@123");
  cy.contains("button", "Sign In").click();
});