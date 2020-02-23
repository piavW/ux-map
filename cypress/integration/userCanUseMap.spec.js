describe('User can use map', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('http://localhost:3000')
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000',
      response: 'fixture:gm_map_markers.json',
      status: 200
    })
  })
  
  it('successfully see zoom-in and out buttons', () => {
    cy.get('[title="Zoom in"]').should('exist')
    cy.get('[title="Zoom out"]').should('exist')
  })

  it('can interact by zooming-in and out', () => {
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint:nth-child(1) > div > .gm-control-active:nth-child(1)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
    cy.get('.gm-style > .gmnoprint > .gmnoprint > div > .gm-control-active:nth-child(3)').click()
  })
})