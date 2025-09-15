import { faker } from '@faker-js/faker';

const mail = "Dale.Rau@gmail.com"  //Remplacer selon sa BDD

const randomEmail = faker.internet.email();

describe('should redirect to home', () => {

    beforeEach(() => {
        cy.visit('/Register')
    })

    it('should show 3 errors', () => {
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="log"]').should('have.length', 3)
    })
    
    it('should ask for email', () => {
        cy.get('[name="password"]').type("pass")
        cy.get('[name="confirmPassword"]').type("pass")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="log"]').contains("L'email est requis")
    })

    it('should reject email format', () => {
        cy.get('[name="email"]').type("mail")
        cy.get('[type="submit"]').click()
        cy.get('[name="email"] + .error-msg').contains("Format d'email invalide")
    })

    it('should ask for matching passwords because empty confirm password', () => {
        cy.get('[name="email"]').type("mail@mail.fr")
        cy.get('[name="password"]').type("pass")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="log"]').contains("Les mots de passe ne correspondent pas")
    })

    it('should ask for matching passwords because password and confirm password not matching', () => {
        cy.get('[name="email"]').type("mail@mail.fr")
        cy.get('[name="password"]').type("pass")
        cy.get('[name="confirmPassword"]').type("pa")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="log"]').contains("Les mots de passe ne correspondent pas")
    })

    it('should say impossible to connect', () => {
        cy.get('[name="email"]').type(mail)
        cy.get('[name="password"]').type("Password123!")
        cy.get('[name="confirmPassword"]').type("Password123!")
        cy.get('[type="submit"]').click()
        cy.get('[data-cy="back-error"]').contains("Impossible de s'enregistrer")
    })

    it('should redirect to home', () => {
        cy.get('[name="email"]').type(randomEmail)
        cy.get('[name="password"]').type("Password123!")
        cy.get('[name="confirmPassword"]').type("Password123!")
        cy.get('[type="submit"]').click()
        cy.url().should('eq', 'http://localhost:5173/')
    })
})