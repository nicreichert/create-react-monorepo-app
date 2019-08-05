/// <reference types="cypress" />
// @ts-check
it('loads web project', () => {
  cy.visit('http://localhost:1234');

  cy.contains('Press Me!');
});
