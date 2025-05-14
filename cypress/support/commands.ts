/// <reference types="cypress" />
import type {} from '../support/cypress';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
Cypress.Commands.add('ingredients', () => {
	cy.visit('http://localhost:8080/');
	cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' }).as(
		'ingredients'
	);
});

Cypress.Commands.add('login', () => {
	window.localStorage.setItem('refreshToken', 'test-refreshToken');
	window.localStorage.setItem('accessToken', 'test-accessToken');
	cy.visit('http://localhost:8080/');
	cy.intercept('GET', '/api/auth/user', { fixture: 'user' }).as('user');
});

Cypress.Commands.add('order', () => {
	cy.visit('http://localhost:8080/');
	cy.intercept('POST', '/api/orders', { fixture: 'order' }).as('order');
});