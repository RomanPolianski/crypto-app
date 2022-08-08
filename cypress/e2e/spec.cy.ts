describe('App E2E', () => {
  it('Should have table', () => {
    cy.visit('/crypto-app');

    cy.get('h1').should('have.text', 'CRYPTO');
  });
});
