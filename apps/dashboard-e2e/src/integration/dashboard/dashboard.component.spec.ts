describe('dashboard', () => {
  beforeEach(() => cy.visit('/iframe.html?id=dashboardcomponent--primary'));
  it('should render the component', () => {
    cy.get('lpg-dashboard').should('exist');
  });
});