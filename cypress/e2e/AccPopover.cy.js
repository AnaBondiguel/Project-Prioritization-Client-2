describe("user account pop over nav test", () => {
  // role === user log in
  beforeEach(() => {
    cy.viewport(1240, 768);
    cy.visit("localhost:3000/signin");
    cy.get('input[name="email"]').type("user1@gmail.com");
    cy.get('input[name="password"]').type("test@123");
    cy.contains("button", "Sign In").click();
  });

  // user log out when click
  it("log out", () => {
    cy.wait(2000);
    cy.get(".MuiButtonBase-root > .MuiAvatar-root").click();
    cy.wait(2000);
    cy.get(".css-oe3ozm-MuiButtonBase-root-MuiMenuItem-root").click();
    cy.location("pathname").should("eq", "/signin");
  });
})