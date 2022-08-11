describe('Header', () => {
  it('text logo', () => {
    cy.visit('/crypto-app').then(() => {
      cy.get('header h1').toMatchImageSnapshot();
    });
  });

  it('app logo', () => {
    cy.get('header img').toMatchImageSnapshot();
  });

  it('cart button', () => {
    cy.get('header button').toMatchImageSnapshot();
  });

  it('Buy cart button', () => {
    cy.get('tbody>tr').eq(4).find('button').toMatchImageSnapshot();
  });
});
