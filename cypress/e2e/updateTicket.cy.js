// different role in updateticket form with different action
// ROLE === user
// can only access own unsubmitted ticket
describe("update ticket", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000)
    cy.contains("a", "WhiteBoard").click();
    cy.wait(2000);
    cy.contains("a", "Edit").click();
  });

  // update success
  it("clear the field will get warning", () => {
    cy.get('textarea[name="description"]').clear().type("This is Cypress Test for update ticket");
    cy.contains("button", "Save").click();
    cy.location("pathname").should("eq", "/mytickets/6371cb29cf404ad955485eb9");
    cy.contains("This is Cypress Test for update ticket");
  });

//   validation test manually
});

// Role == manager
// can access all submitted tickets and update ICE 
describe("update ticket", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("ana@test.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.contains("a", "Chen Test 2").click();
    cy.wait(2000);
    cy.contains("a", "Update").click();
  });

  // field not valid
  it("clear the field will get warning", () => {
    cy.get("#mui-component-select-target").click();
    cy.wait(2000);
    cy.contains("li", "Free").click()
    // because save botton will change ticket status to unsubmit
    cy.contains("button", "Save").should("be.disabled");
    cy.contains("button", "Update").click();
    cy.wait(2000);
    // check changed value
    cy.get(".MuiChip-label").contains("Free");
  });

});