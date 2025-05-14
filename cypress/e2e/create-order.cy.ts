const bunId = '643d69a5c3f7b9001cfa093c';
const mainId = '643d69a5c3f7b9001cfa0941';
const sauceId = '643d69a5c3f7b9001cfa0942';
const numberOfOrder = 76822;

describe('Creating an order', () => {
	it('should open pop-up details of ingredient', () => {
		cy.ingredients();
		cy.get(`[data-cy=ingredient-${bunId}]`).click();
		cy.url().should('include', `/ingredients/${bunId}`);
	});

	it('should move ingredients to constructor and create order', () => {
		cy.login();
		cy.ingredients();
		cy.order();
		cy.get('[data-cy=ingredientsContainer]').as('ingredientsContainer');
		cy.get(`[data-cy=ingredient-${bunId}]`).trigger('dragstart');
		cy.wait(500);
		cy.get('@ingredientsContainer').trigger('drop');
		cy.wait(500);
		cy.get(`[data-cy=ingredient-${mainId}]`).trigger('dragstart');
		cy.wait(500);
		cy.get('@ingredientsContainer').trigger('drop');
		cy.wait(500);
		cy.get(`[data-cy=ingredient-${sauceId}]`).trigger('dragstart');
		cy.wait(500);
		cy.get('@ingredientsContainer').trigger('drop');
		cy.get('[data-cy=buttonOrder]').click();
		cy.wait(500);
		cy.get('[data-cy=orderNumber]').should('have.text', `${numberOfOrder}`);
	});
});
