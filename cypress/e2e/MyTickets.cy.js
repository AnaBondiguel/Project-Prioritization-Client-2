describe("Profile editing", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
  });

//  Button at my tickets page
it("nav to new ticket page after click add ticket button at /mytickets", () => {
  cy.wait(2000);
  cy.contains("a", "Add Ticket").click();
  cy.wait(2000);
  cy.location("pathname").should("eq", "/newticket");
});

// click initiative title nav to ticket details page
it("nav to new ticket page after click add ticket button at /mytickets", () => {
  cy.wait(2000);
  cy.contains("a", "WhiteBoard").click();
  cy.wait(2000);
  cy.location("pathname").should("eq", "/mytickets/6371cb29cf404ad955485eb9");
});
});

