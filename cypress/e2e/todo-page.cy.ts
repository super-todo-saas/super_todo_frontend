// https://on.cypress.io/api

describe('Visit Homepage (also Todo Page)', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('span', 'Your current plan:')
  })
})
