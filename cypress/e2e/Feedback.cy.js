// Role == manager
// can leave feedback to sunmitted ticket and delete tickets
describe("manager add feedback", () => {
  beforeEach(() => {
    cy.viewport(1240, 1000);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("ana@test.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.contains("a", "Chen Test 2").click();
  });

  // add feedback
  it("add feedback", () => {
    cy.contains("a", "Add Feedback").click();
    // jump to new path ../mytickets/../feedback
    cy.location("pathname").should("include", "/feedback")
    cy.get('textarea[name="context"]').type("This is cypress test for Feedback");
    cy.contains("button", "Submit").click();
    // check new feedback is shown
    cy.contains("This is cypress test for Feedback");
  });
});

// Role === user
//  user can see the feedback
describe("see feedback", () => {
  beforeEach(() => {
    cy.viewport(1240, 1000);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("chen@test.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.contains("a", "Chen Test 2").click();
  });

  // see feedback
  it("see feedback", () => {
    // get value that manager send
    cy.contains("This is cypress test for Feedback");
  });
});

// role = manager
// manger can delete feedback
describe("manager delete feedback", () => {
  beforeEach(() => {
    cy.viewport(1240, 1000);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("ana@test.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.contains("a", "Chen Test 2").click();
  });

  // see feedback
  it("delete feedback", () => {
    // check the feedback is valid
    cy.contains("This is cypress test for Feedback");
    // delete feedback
    cy.contains("button", "Delete")
    // can't figue out the button on multiple feedback
    // ! Need manual test delete feedback
  });
});