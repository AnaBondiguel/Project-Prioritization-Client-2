describe("User Sign Up and Sign in Functionality Testing", function () {
  // -------------------------------
  // sign up function
  it("signup  user", function () {
    cy.visit("localhost:3000/signup");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.get('input[name="confirmPassword"]').type("test@123");
    cy.contains("button", "Sign Up").click();
    // cy.get('input[name="firstName"]').type("Cypress");;
    // cy.get('input[name="lastName"]').type("Test");;
  });

  it("signup with input area empty", function () {
    cy.visit("localhost:3000/signup");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.get('input[name="confirmPassword"]').type("test@123");
    cy.contains("button", "Sign Up").click();
    cy.contains("Fields can't be blank");
    // cy.get('input[name="firstName"]').type("Cypress");;
    // cy.get('input[name="lastName"]').type("Test");;
  });

  it("signup with email which has been registered", function () {
    cy.visit("localhost:3000/signup");
    cy.get('input[name="firstName"]').type("Cypress");
    cy.get('input[name="lastName"]').type("Test");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.get('input[name="confirmPassword"]').type("test@123");
    cy.contains("button", "Sign Up").click();
    cy.contains("Email already in use");
  });

  it("signup with  eamil is an invalid email address /password and confirmPassword not match", function () {
    cy.visit("localhost:3000/signup");
    cy.get('input[name="firstName"]').type("Cypress");
    cy.get('input[name="lastName"]').type("Test");
    cy.get('input[name="email"]').type("user1@gmail");
    cy.get('input[name="password"]').type("test@123");
    cy.get('input[name="confirmPassword"]').type("test@12315");
    cy.contains("button", "Sign Up").click();
    cy.contains("invalid email address");
    cy.contains("confirm password does not match");
  });

// -------------------------------
//  Sign in function
  it("Signs in the user account that was created by the previous test", function () {
    cy.visit("localhost:3000/signin");
    cy.contains("button", "Sign In");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.location("pathname").should("eq", "/mytickets");
  });

  // unvalid password or email
  it("test invalid email ", function () {
    cy.visit("localhost:3000/signin");
    cy.contains("button", "Sign In");
    cy.get('input[name="email"]').type("user1");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.contains("Incorrect email");
  });

  it("test invalid passowrd ", function () {
    cy.visit("localhost:3000/signin");
    cy.contains("button", "Sign In");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test");
    cy.contains("button", "Sign In").click();
    cy.contains("Invalid password");
  });
});
