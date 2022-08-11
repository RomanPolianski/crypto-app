describe('App E2E', () => {
  it('Should have table', () => {
    cy.visit('/crypto-app');
    cy.get('table').should('be.visible').should('exist');
  });

  it('Should add Bitcoin to cart', () => {
    cy.contains('tr', 'Bitcoin').find('button').click();
    cy.get('input[type="number"]')
      .should('be.visible')
      .should('have.value', '')
      .type('2.21')
      .should('have.value', '2.21');
    cy.get('button').contains('Add').click();
    cy.contains('Portfolio').click();
    cy.contains('Bitcoin')
      .should('be.visible')
      .contains('2.21')
      .should('be.visible');
    cy.contains('Prev').click();
  });

  it('Should add rank 3 coin to cart', () => {
    cy.get('tbody>tr').eq(4).find('button').click();
    cy.get('input[type="number"]')
      .should('be.visible')
      .should('have.value', '')
      .type('213.21')
      .should('have.value', '213.21');
    cy.get('button').contains('Add').click();
    cy.contains('Portfolio').click();
    cy.get('table tr').should('have.length', 3).should('be.visible');
    cy.contains('Prev').click();
  });

  it('Should add 4th coin from 2nd page to cart', () => {
    cy.contains('Next').click().wait(1000);
    cy.get('tbody>tr').eq(5).find('button').click();
    cy.get('input[type="number"]')
      .should('be.visible')
      .should('have.value', '')
      .type('213.21')
      .should('have.value', '213.21');
    cy.get('button').contains('Add').click();
    cy.contains('Portfolio').click();
    cy.get('table tr').should('have.length', 4).should('be.visible');
    cy.contains('Prev').click();
  });

  it('Should add 10th coin from 9th page to cart', () => {
    cy.contains('Next')
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click()
      .click();

    cy.contains('Prev').click().wait(1000);
    cy.get('tbody>tr').eq(9).find('button').click();
    cy.get('input[type="number"]')
      .should('be.visible')
      .should('have.value', '')
      .type('1000')
      .should('have.value', '1000');
    cy.get('button').contains('Add').click();
    cy.contains('Portfolio').click();
    cy.get('table tr').should('have.length', 5).should('be.visible');
  });

  it('Should delete 1 coin from cart', () => {
    cy.contains('Cross').click();
    cy.get('button').contains('Delete').click().wait(500);
    cy.get('table tr').should('have.length', 4).should('be.visible');
    cy.contains('Prev').click();
  });

  it('Should open 6th coin Info Modal and add to cart', () => {
    cy.get('tbody>tr').eq(6).click().wait(500);
    cy.get('canvas').should('be.visible');
    cy.get('input[type="number"]')
      .should('be.visible')
      .should('have.value', '')
      .type('1088')
      .should('have.value', '1088');
    cy.get('button').contains('Add').click();
    cy.contains('Portfolio').click();
  });

  it('Should delete all coins from cart', () => {
    cy.contains('Cross').click();
    cy.get('button').contains('Delete').click().wait(500);
    cy.contains('Cross').click();
    cy.get('button').contains('Delete').click().wait(500);
    cy.contains('Cross').click();
    cy.get('button').contains('Delete').click().wait(500);
    cy.contains('Cross').click();
    cy.get('button').contains('Delete').click().wait(500);
    cy.get('table').should('not.exist');
    cy.contains('Prev').click();
  });
});
