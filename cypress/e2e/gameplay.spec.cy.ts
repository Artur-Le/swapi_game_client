describe('Gameplay', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/people?page=1&limit=100').as('getIds');
        cy.visit('http://localhost:4200/');
        cy.wait('@getIds');
    });

    it('passes', () => {
        cy.intercept('GET', '**/people/*').as('getPerson');
        cy.get('.play-button').click();
        cy.wait(['@getPerson', '@getPerson']);

        cy.get('mat-card-title:first').invoke('text')
            .then((text) => {
                expect(text.length).to.be.at.least(6);
            });
    });
});
