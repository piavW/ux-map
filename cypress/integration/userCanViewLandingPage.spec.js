describe('User can view landing page', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('http://localhost:3000')
  })
  it('successfully', () => {
    cy.get('#header').should('contain', 'UX-Map')
  })
  
})