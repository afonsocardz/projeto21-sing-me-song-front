import {faker} from '@faker-js/faker'

describe('Testa rota que cria recomendação', () => {
  it('Verifica sucesso na criação de recomendação', async () => {
    const newRecommendation = {
      name: faker.name.firstName(),
      youtubeLink: "https://www.youtube.com/video"
    }
    cy.visit('http://localhost:3000/');

    cy.intercept("GET", "/recommendations").as("list");
    cy.intercept("POST", "/recommendations").as("creation");

    cy.wait('@list');

    cy.get('input[placeholder="Name"]').type(newRecommendation.name);
    cy.get('input[placeholder="https://youtu.be/..."').type(newRecommendation.youtubeLink);
    cy.get('button').click();

    cy.wait('@creation');

    cy.contains(newRecommendation.name).should('be.visible');
  })
})