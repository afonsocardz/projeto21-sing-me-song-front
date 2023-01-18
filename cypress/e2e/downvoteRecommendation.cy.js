describe('Testa rota de downvote', () => {
  it('Testa sucesso de downvote', async () => {
    cy.visit('http://localhost:3000/');

    cy.intercept("GET", '/recommendations').as('list');
    cy.wait('@list');

    cy.get('[data-id]').first().invoke('data', 'id').as('recommendationId');

    cy.get('@recommendationId').
      then(dataId => {
        cy.intercept("POST", `/recommendations/${dataId}/downvote`).as('downvote');
        cy.get(`[data-id="${dataId}"] [data-cy="downvote"]`).click()
      });

    cy.wait('@downvote').its('response.statusCode').should('equal', 200);
  });
  it('Testa remoção da recomendação quando downvote menor que 5', async () => {

    cy.visit('http://localhost:3000/');
    cy.intercept("GET", '/recommendations').as('list');
    cy.wait('@list');

    cy.get('[data-id]').first().invoke('data', 'id').as('recommendationId');

    cy.get('@recommendationId').
      then(dataId => {
        cy.intercept("GET", '/recommendations').as('list');
        for(let i = 0; i < 6; i++){
          cy.intercept("POST", `/recommendations/${dataId}/downvote`).as('downvote');
          cy.get(`[data-id="${dataId}"] [data-cy="downvote"]`).click();
          cy.wait('@downvote');
        }
        cy.wait('@list');
        cy.get(`[data-id="${dataId}"]`).should('not.exist');
      });

    
  });
})