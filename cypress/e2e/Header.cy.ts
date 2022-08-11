describe('Header E2E', () => {
  it('Should text logo table', () => {
    cy.visit('/crypto-app');
    cy.get('h1').should('have.text', 'CRYPTO');
    cy.get('button').should('be.visible');
  });

  it('Should have top 3 coins in header', () => {
    cy.get('header')
      .wait(500)
      .get('p:first-of-type')
      .siblings()
      .should('be.visible');
  });

  it('Should have top 0 in total', () => {
    cy.get('header')
      .contains('USD')
      .siblings()
      .should('have.text', '$0.00')
      .should('be.visible');
  });
});
