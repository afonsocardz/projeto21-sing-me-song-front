describe('Testa rota de incremento de voto da recomendação', () => {
  it('Testa sucesso do incremento', async () => {
    cy.visit('http://localhost:3000/');

    cy.intercept("GET", '/recommendations').as('list');
    cy.wait('@list');

    cy.get('[data-id]').first().invoke('data', 'id').as('recommendationId');

    cy.get('@recommendationId').
      then(dataId => {
        cy.intercept("POST", `/recommendations/${dataId}/upvote`).as('upvote');
        cy.get(`[data-id="${dataId}"] [data-cy="upvote"]`).click()
      });
    
    cy.wait('@upvote').its('response.statusCode').should('equal', 200);
  })
})