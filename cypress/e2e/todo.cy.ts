const firstRowStatus =
	'.px-4 > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > span:nth-child(1) > svg:nth-child(1)';

const firstRowDelete =
	'.px-4 > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > span:nth-child(1) > svg:nth-child(1)';

const firstRowText =
	'.px-4 > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(1)';

const firstRowEdit =
	'.px-4 > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1) > svg:nth-child(1)';

const firstRowInput =
	'.px-4 > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)';

const editedText = 'Some new todo task';

const firstRowSaveEdit =
	'.px-4 > section:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > span:nth-child(1) > svg:nth-child(1)';

beforeEach(() => {
	cy.visit('/');
});

describe('Todo', () => {
	it('complete', () => {
		cy.waitUntil(() => cy.get(firstRowStatus).should('be.visible'));
		cy.get(firstRowStatus)
			.invoke('attr', 'class')
			.as('beforeClassList')
			.then((beforeClassList) => {
				cy.get(firstRowStatus).click();
				cy.waitUntil(() =>
					cy
						.get(firstRowStatus)
						.invoke('attr', 'class')
						.then((afterClassList) =>
							cy
								.wrap(afterClassList ?? '')
								.as('afterClassList')
								.then((afterClassList) => afterClassList !== beforeClassList),
						),
				);

				cy.get(firstRowStatus)
					.invoke('attr', 'class')
					.as('afterClassList')
					.then((afterClassList) => {
						expect(
							(beforeClassList?.includes('green') && afterClassList?.includes('red')) ||
								(beforeClassList?.includes('red') && afterClassList?.includes('green')),
						).to.eq(true);
					});
			});
	});

	it('delete', () => {
		cy.waitUntil(() => cy.get(firstRowStatus).should('be.visible'));
		cy.get(firstRowText)
			.invoke('text')
			.then((beforeText) => {
				cy.get(firstRowDelete).click();
				cy.waitUntil(() =>
					cy
						.get(firstRowText)
						.invoke('text')
						.then((afterText) =>
							cy
								.wrap(afterText ?? '')
								.as('afterText')
								.then((afterText) => afterText !== beforeText),
						),
				);

				cy.get(firstRowText)
					.invoke('text')
					.as('afterText')
					.then((afterText) => {
						expect(beforeText !== afterText).to.eq(true);
					});
			});
	});

	it('edit', () => {
		cy.waitUntil(() => cy.get(firstRowStatus).should('be.visible'));
		cy.get(firstRowText)
			.invoke('text')
			.then((beforeText) => {
				cy.get(firstRowEdit).click();
				cy.get(firstRowInput).clear();
				cy.get(firstRowInput).type(editedText);
				cy.get(firstRowSaveEdit).click();

				cy.waitUntil(() =>
					cy
						.get(firstRowText)
						.invoke('text')
						.then((afterText) =>
							cy
								.wrap(afterText ?? '')
								.as('afterText')
								.then((afterText) => afterText !== beforeText),
						),
				);

				cy.get(firstRowText)
					.invoke('text')
					.as('afterText')
					.then((afterText) => {
						expect(afterText.includes(editedText)).to.eq(true);
					});
			});
	});
});
