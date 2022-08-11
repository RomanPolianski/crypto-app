describe('InfoModal', () => {
  it('Input', () => {
    cy.visit('/crypto-app').then(() => {
      cy.get('tbody>tr').eq(8).click().wait(500);
      cy.get('input[type="number"]').toMatchImageSnapshot();
    });
  });

  it('Add Button', () => {
    cy.get('button').contains('Add').toMatchImageSnapshot();
  });

  it('Close button', () => {
    cy.contains('Cross').toMatchImageSnapshot();
    cy.contains('Cross').click();
  });
});
