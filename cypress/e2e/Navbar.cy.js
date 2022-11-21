
// navBar to different pages
describe("user nav to different pages", () => {
  // role === user log in
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
  });

  //to new tickets page

  // ---------------------------------------
  // open nav bar and nav to new page

  it("nav to new ticket page from navbar", () => {
    cy.wait(2000);
    //  nav to new ticket page
    cy.contains("a", "New Ticket").click();
    cy.location("pathname").should("eq", "/newticket");
    cy.wait(2000);
    //  nav to all submitted tikcets page
    cy.contains("a", "Listings").click();
    cy.location("pathname").should("eq", "/listings");
    cy.wait(2000);
    //  nav to all my tickets page
    cy.contains("a", "My Tickets").click();
    cy.location("pathname").should("eq", "/mytickets");
    cy.wait(2000);
    //  nav to my profile page
    cy.contains("a", "Profile").click();
    cy.location("pathname").should("eq", "/blog");
    cy.wait(2000);
    //  nav to sign in page will reder to mytickets page because user is already logged in
    cy.contains("a", "Sign In").click();
    cy.location("pathname").should("eq", "/mytickets");
    cy.wait(2000);
    //  nav to 404 page
    cy.contains("a > ", "Not found").click();
    cy.location("pathname").should("eq", "/404");
    cy.wait(2000);
  });

  // --------------------------------------------------
  //  Button at my tickets page
  it("nav to new ticket page after click add ticket button at /mytickets", () => {
    cy.wait(2000);
    cy.contains("a", "Add Ticket").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/newticket");
  });



  // user log out
  it("log out", () => {
    cy.wait(2000);
    cy.get(".MuiButtonBase-root > .MuiAvatar-root").click();
    cy.wait(2000);
    cy.get(".css-oe3ozm-MuiButtonBase-root-MuiMenuItem-root").click();
    cy.location("pathname").should("eq", "/signin");
  });
});
