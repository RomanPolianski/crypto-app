describe('Pagination', () => {
  it('text logo', () => {});

  it('Match - Next Button', () => {
    cy.visit('/crypto-app').then(() => {
      cy.contains('Next').toMatchImageSnapshot();
    });
  });

  it('Match - Prev Button', () => {
    cy.contains('Prev').toMatchImageSnapshot();
  });

  it('Match - Pagination number button', () => {
    cy.get('li').contains('1').toMatchImageSnapshot();
  });
});
