describe('User can view landing page', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('http://localhost:3001')
  })
  it('successfully', () => {
    cy.get('#header').should('contain', 'UX-Map')
  })
  
})