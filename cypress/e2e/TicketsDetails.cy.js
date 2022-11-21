//  ROLE === user
//  access own unsubmitted ticket
describe("When access with as user and ticket is not submitted", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.contains("a", "Cypress Test").click();
  });

  // click edit button to edit page
  it("can click Edit button to edit page", () => {
    cy.wait(2000);
    cy.contains("a", "Edit").click();
    cy.url().should("include", "/mytickets/update/");
  });

  // delete button to delete ticket
  it("Delete ticket ", () => {
    cy.wait(2000);
    cy.contains("button", "Delete").click();
    cy.location("pathname").should("eq", "/mytickets");
  });
});

// access to other users submitted ticket
describe("Access to other users' submitted ticket", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.visit("http://localhost:3000/mytickets/63790a09cb4755597889b368");
  });

    it("no save and submit button show in the ticket details page", () => {
      cy.wait(2000);
      cy.contains("Submitted")
      cy.get("button").not("save");
      cy.get("button").not("submit");
    });

});

//  USER = manager
//  manager can edit submitted tikcet only ice part
describe("Manager access to other user's submitted ticket and edit button show and nav", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("ana@test.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.visit("http://localhost:3000/mytickets/63790a09cb4755597889b368");
  });

  it("manager will see the update button and the delete button which is disabled", () => {
    cy.wait(2000);
    cy.contains("Submitted");
    cy.contains("button", "Delete").should('be.disabled')
    cy.wait(2000);
    cy.contains("a", "Update").click();
    cy.url().should("include", "/mytickets/update/");
  });
});