// sing in and sign up page nav
describe('page nav test', () => {
  it('showing sign in page withour authorize', () => {
    cy.visit('localhost:3000/mytickets')
    cy.location("pathname").should("eq", "/signin");
  });

  it('jump to sign up page with click link sign Up?', () => {
    cy.visit("localhost:3000/signin");
    cy.contains('a', "Sign Up?").click();
    cy.location("pathname").should("eq", "/signup");
  });

   it("jump to sign in page with click link sign In", () => {
     cy.visit("localhost:3000/signup");
     cy.contains("a", "Sign In").click();
     cy.location("pathname").should("eq", "/signin");
   });

});

// log in
describe('user log in', () => {

});