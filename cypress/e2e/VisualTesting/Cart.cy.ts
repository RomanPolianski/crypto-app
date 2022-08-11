describe('Cart', () => {
  it('Delete button', () => {
    cy.visit('/crypto-app').then(() => {
      cy.contains('tr', 'Bitcoin').find('button').click();
      cy.get('input[type="number"]').type('2.21').should('have.value', '2.21');
      cy.get('button').contains('Add').click();
      cy.contains('Portfolio').click();
      cy.contains('Cross').toMatchImageSnapshot();
    });
  });
});
