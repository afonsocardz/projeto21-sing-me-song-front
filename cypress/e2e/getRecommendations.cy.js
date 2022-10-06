

describe('Testa rota que lista recomendações', () => {
  it('Verifica sucesso na listagem das recomendações', () => {
    cy.visit('http://localhost:3000');
    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");
    cy.get('article').should('be.visible');
  })
})