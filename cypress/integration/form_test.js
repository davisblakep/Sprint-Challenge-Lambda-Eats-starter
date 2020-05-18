describe("This is our first test!", () => {
    it("Shoud return true", () => {
        expect(true).to.equal(true);
    })
})

it("Input Name into the Name Input", () => {
    cy.visit("http://localhost:3000/pizza")
    cy.get('input[name="name"]')
    .type("Blake Davis")
    .should("have.value", "Blake Davis")
})

it("Input Email into Email field", () => {
    cy.get('input[name="email"]')
    .type("blake@email.com")
    .should("have.value", "blake@email.com")
})


it("Select pizza size from dropdown menu", () => {
    cy.get('#size').select('Large')
    .should("have.value", "Large")
})

it("Select pizza sauce from dropdown menu", () => {
    cy.get('#sauce').select('Original Red')
    .should("have.value", "Original Red")
})

it("Click Checkbox", () => {
    cy.get('[type="checkbox"]').check() 
})

it("Input Text into Text field", () => {
    cy.get('textarea[name="special"]')
    .type("Ring the door bell 349 times.")
    .should("have.value", "Ring the door bell 349 times.")
})


it("Click Submit", () => {
    cy.get('.submitButton').click()    
})   