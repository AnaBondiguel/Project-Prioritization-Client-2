// search test
describe('Searchbar testing', () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
  });

  // test logo link funtion
  it('click logo will back to home page user should /mytickets', () => {
    cy.contains("a").get(".css-nrbdg7").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/mytickets");
  })

  // test search bar can go to SearchResults page
    it("input something in searchbar will nav to serchresults page", ()=>{
      cy.get(".css-h3bten-MuiButtonBase-root-MuiIconButton-root").click();   
      cy.get('input').type("test{enter}");
      cy.wait(2000);
      cy.location("pathname").should("eq", "/searchresults");
    })

})

// profile page test
describe("Profile editing", () => {
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
    cy.contains("a", "Profile").click();
  });

  // field not valid
  it("Empty field will get a warning", () => {
    cy.get('input[name="firstName"]').clear()
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.wait(2000);
    cy.contains("button", "Save details").click();
    cy.contains("Fields can't be blank");
    cy.contains("invalid email address");
  });

  // edit success
  it("Edit success and jump to home page", () => {
    cy.get('input[name="firstName"]').clear().type("user1");
    cy.contains("button", "Save details").click();
    // succes nv back to home page
    cy.location("pathname").should("eq", "/mytickets");
  });

});