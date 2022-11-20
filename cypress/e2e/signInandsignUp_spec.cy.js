describe("User Sign Up and Sign in Functionality Testing", function() {
  it("signup and login user", function() {
    cy.visit("localhost:3000/signup");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.get('input[name="confirmPassword"]').type("test@123");
    cy.contains("button", "Sign Up");
    // cy.get('input[name="firstName"]').type("Cypress");;
    // cy.get('input[name="lastName"]').type("Test");;
  });

  it("Signs in the user account that was created by the previous test", function() {
    cy.visit("localhost:3000/signin");
    cy.contains("button", "Sign In");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.visit("localhost:3000");
});

})

