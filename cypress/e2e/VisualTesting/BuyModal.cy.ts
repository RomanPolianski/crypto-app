describe('BuyModal', () => {
  it('Input', () => {
    cy.visit('/crypto-app').then(() => {
      cy.get('tbody>tr').eq(9).find('button').click();
      cy.get('input[type="number"]').toMatchImageSnapshot();
    });
  });

  it('Add button', () => {
    cy.get('button').contains('Add').toMatchImageSnapshot();
  });

  it('Close button', () => {
    cy.contains('Cross').toMatchImageSnapshot();
    cy.contains('Cross').click();
  });
});
