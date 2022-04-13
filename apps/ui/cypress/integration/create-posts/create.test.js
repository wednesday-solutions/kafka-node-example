/// <reference types="cypress" />
// const autoRecord = require("cypress-autorecord");

const NEW_POST_TEXT =
    "If you work for an ad agency and getting paid for it aren't you the one who is being influenced by advertising?";

describe("Read posts", function () {
    // autoRecord();
    beforeEach(() => {
        cy.intercept("**/graphql", { fixture: "newPost" }).as("createPost");

        cy.visit("/create");
    });

    it("Displays list of posts by default", function () {
        cy.findByRole("textbox", { name: /post/i }).type(NEW_POST_TEXT);
        cy.findByRole("button", { name: /submit/i }).click();

        cy.wait("@createPost").should(({ request, response }) => {
            expect(response.statusCode).to.equal(200);
            expect(response.body).to.nested.property("data.addPost");
            expect(response.body.data.addPost.title).to.equal(NEW_POST_TEXT);
        });
    });
});
