describe('layout', () => {
  beforeEach(() => cy.visit('/iframe.html?id=layoutcomponent--primary'));
  it('should render the component', () => {
    cy.get('lpg-layout').should('exist');
  });
});