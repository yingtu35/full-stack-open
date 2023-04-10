describe("Note App", () => {
  beforeEach(function() {
    // initialize the database
    cy.request("POST", `${Cypress.env("BACKEND")}/test/reset`)
    const user = {
      name: "admin",
      username: "root",
      password: "root"
    }
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user)
    cy.visit("")
  })

  it("front page can be opened", function() {
    cy.contains("Notes App")
    cy.contains("Created by Ying Tu 2023")
  })

  it("login form can be opened", function() {
    cy.contains("login").click()
  })

  it("user can login", function() {
    cy.contains("login").click()
    cy.get("#username").type("root")
    cy.get("#password").type("root")
    cy.get("#login-button").click()

    cy.contains("Logged in as admin")
  })

  it("login fails when user credentials is wrong", function() {
    cy.contains("login").click()
    cy.get("#username").type("root")
    cy.get("#password").type("wrong")
    cy.get("#login-button").click()

    cy.get(".error")
      .should("contain", "Invalid username or password")
      .should("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid")
      .and("have.css", "border-color", "rgb(255, 0, 0)")

    cy.get("html").should("not.contain", "Logged in as admin")
  })

  describe("when logged in", function() {
    beforeEach(function() {
      cy.login({
        username: "root",
        password: "root"
      })
    })

    it.only("user can create a new note", function() {
      cy.contains("new note").click()

      cy.get("#note-input").type("testing new note")
      cy.get("#note-input-button").click()

      cy.get(".success")
        .should("contain", "Note: 'testing new note' is added to the server")
        .should("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid")
        .and("have.css", "border-color", "rgb(0, 128, 0)")

      cy.get(".notes").contains("testing new note")
    })

    describe("and when a note exists", function() {
      beforeEach(function() {
        cy.createNote({ content: "first note", important: true })
        cy.createNote({ content: "second note", important: true })
        cy.createNote({ content: "third note", important: true })
      })

      it("it can be made not important", function() {
        cy.get(".notes").debug().contains("second note").as("secondNote")

        cy.get("@secondNote")
          .contains("make not important")
          .click()

        cy.get("@secondNote")
          .contains("make important")
      })
    })
  })
})