
const mail = "Dale.Rau@gmail.com"  //Remplacer selon sa BDD

describe('should redirect to home', () => {

    beforeEach(() => {
        cy.visit('/login')
    })

    it('should show email and password required', () => {
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="log"]').should('have.length', 2)
    })

    it('should show password required', () => {
        cy.get('[name="email"]').type("mail")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="log"]').should('have.length', 1)
    })

    it('should show email required', () => {
        cy.get('[name="password"]').type("pass")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="log"]').should('have.length', 1)
    })

    it('should show back error', () => {
        cy.get('[name="email"]').type("mail")
        cy.get('[name="password"]').type("pass")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="back-error"]').should('have.length', 1)
    })

    it('should show back error', () => {
        cy.get('[name="email"]').type(mail)
        cy.get('[name="password"]').type("pass")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="back-error"]').should('have.length', 1)
    })

    it('should redirect to home', () => {
        cy.get('[name="email"]').type(mail)
        cy.get('[name="password"]').type("Password123!")
        cy.get('[type="submit"]').click()
        cy.url().should('eq', 'http://localhost:5173/')
    })
})