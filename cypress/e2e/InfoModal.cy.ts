describe('InfoModal E2E', () => {
  it('Should open and exit InfoModal', () => {
    cy.visit('/crypto-app');
    cy.get('tbody>tr').eq(8).click().wait(500);
    cy.contains('Cross').click();
    cy.get('canvas').should('not.be.exist');
    cy.get('input[type="number"]').should('not.be.exist');
  });

  it('Should open 8th coin Info Modal and add to cart', () => {
    cy.visit('/crypto-app');
    cy.get('tbody>tr').eq(8).click().wait(500);
    cy.get('canvas').should('be.visible');
    cy.get('input[type="number"]')
      .should('be.visible')
      .should('have.value', '')
      .type('1088')
      .should('have.value', '1088');
    cy.get('button').contains('Add').click();
    cy.contains('Portfolio').click();
    cy.contains('Prev').click();
  });

  it('Should be disabled Add button if > 3 decimals in input', () => {
    cy.get('tbody>tr').eq(8).click().wait(500);
    cy.get('canvas').should('be.visible');
    cy.get('input[type="number"]')
      .should('be.visible')
      .should('have.value', '')
      .type('1088.122');
    cy.get('button').contains('Add').should('be.disabled');
  });

  it('Should be disabled Add button if input = 0', () => {
    cy.get('input[type="number"]').should('be.visible').clear().type('0000213');
    cy.get('button').contains('Add').should('be.disabled');
  });

  it('Should add value with 2 decimals', () => {
    cy.get('input[type="number"]').should('be.visible').clear().type('1.12');
    cy.get('button').contains('Add').click();
  });
});
