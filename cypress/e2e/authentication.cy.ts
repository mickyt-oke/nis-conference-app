describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('Admin user login and dashboard access', () => {
    cy.get('input[name=email]').type('admin@nis.gov.ng')
    cy.get('input[name=password]').type('admin123')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/admin')
    cy.contains('Admin Dashboard')
  })

  it('Supervisor user login and dashboard access', () => {
    cy.get('input[name=email]').type('supervisor@nis.gov.ng')
    cy.get('input[name=password]').type('supervisor123')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/supervisor')
    cy.contains('Supervisor Dashboard')
  })

  it('Regular user login and dashboard access', () => {
    cy.get('input[name=email]').type('user@nis.gov.ng')
    cy.get('input[name=password]').type('user123')
    cy.get('button[type=submit]').click()
    cy.url().should('include', '/dashboard')
    cy.contains('User Dashboard')
  })

  it('Invalid login shows error', () => {
    cy.get('input[name=email]').type('invalid@user.com')
    cy.get('input[name=password]').type('wrongpass')
    cy.get('button[type=submit]').click()
    cy.contains('Invalid email or password')
  })

  it('Access protected route redirects to login when logged out', () => {
    cy.visit('/admin/dashboard')
    cy.url().should('include', '/login')
  })
})
