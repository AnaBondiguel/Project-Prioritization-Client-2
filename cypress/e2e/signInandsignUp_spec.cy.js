// sing in and sign up page nav
describe("signin signup page nav test", () => {
  it("showing sign in page withour authorize", () => {
    cy.visit("localhost:3000/mytickets");
    cy.location("pathname").should("eq", "/signin");
  });

  it("jump to sign up page with click link sign Up?", () => {
    cy.visit("localhost:3000/signin");
    cy.contains("a", "Sign Up?").click();
    cy.location("pathname").should("eq", "/signup");
  });

  it("jump to sign in page with click link sign In", () => {
    cy.visit("localhost:3000/signup");
    cy.contains("a", "Sign In").click();
    cy.location("pathname").should("eq", "/signin");
  });
});

// ---------------------------------------------------------------------------------
// sigin signup
describe("User Sign Up and Sign in Functionality Testing", function () {
  // -------------------------------
  // sign up function
  it("signup  user", function () {
    cy.visit("localhost:3000/signup");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.get('input[name="confirmPassword"]').type("test@123");
    cy.wait(2000);
    cy.contains("button", "Sign Up").click();
  });

  it("signup with input area empty", function () {
    cy.visit("localhost:3000/signup");
    cy.contains("button", "Sign Up").click();
    cy.contains("Fields can't be blank");
  });

  it("signup with email which has been registered", function () {
    cy.visit("localhost:3000/signup");
    cy.get('input[name="firstName"]').type("Cypress");
    cy.get('input[name="lastName"]').type("Test");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.get('input[name="confirmPassword"]').type("test@123");
    cy.contains("button", "Sign Up").click();
    cy.wait(2000);
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
    cy.wait(2000);
    cy.contains("invalid email address");
    cy.contains("confirm password does not match");
  });

  // -------------------------------
  //  Sign in function

  // unvalid password or email
  it("test invalid email ", function () {
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.contains("Incorrect email");
  });

  it("test invalid passowrd ", function () {
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.contains("Invalid password");
  });

  // -----------------------------------------
  // user and manager redering to different page
  it("Signs in the user account", function () {
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/mytickets");
  });

  it("Signs in the manager account", function () {
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("ana@test.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/listings");
  });
});
