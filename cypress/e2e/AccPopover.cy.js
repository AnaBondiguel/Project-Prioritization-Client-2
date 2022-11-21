describe("user account pop over nav test", () => {
  // role === user log in
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
  });


  // Home button link to the page according the role of users
  it("to home page /mytickets for user role", () => {
    cy.wait(2000);
    cy.get(".MuiButtonBase-root > .MuiAvatar-root").click();
    cy.wait(2000);
    cy.contains('a', "Home").click();
    cy.location("pathname").should("eq", "/mytickets");
    
  });

   it("to profile page /profile ", () => {
     cy.wait(2000);
     cy.get(".MuiButtonBase-root > .MuiAvatar-root").click();
     cy.wait(2000);
     cy.get(".css-1ludl2-MuiStack-root").contains("a", "Profile").click();
     cy.location("pathname").should("eq", "/profile");
     cy.wait(2000);
   });


  // users log out when they click the button
  it("log out", () => {
    cy.wait(2000);
    cy.get(".MuiButtonBase-root > .MuiAvatar-root").click();
    cy.wait(2000);
    cy.get(".css-oe3ozm-MuiButtonBase-root-MuiMenuItem-root").click();
    cy.location("pathname").should("eq", "/signin");
  });
})