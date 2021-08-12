describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', {username: "JBlakd", name: "Ivan Hu", password: "sampleivanpw"})
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('JBlakd')
      cy.get('#password').type('sampleivanpw')
      cy.get('#login-button').click()
      cy.contains('Ivan Hu logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tdfyhxghf')
      cy.get('#password').type('fghgf')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('JBlakd')
      cy.get('#password').type('sampleivanpw')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#new-title-input').type("Ivan's Testing Blog")
      cy.get('#new-author-input').type("Ivan's Testing Author")
      cy.get('#new-url-input').type("http://www.ivanssampleurl/")
      cy.get('#new-blog-create-button').click()

      cy.contains("Ivan's Testing Blog | Ivan's Testing Author")
    })

    describe('After a blog has been created', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#new-title-input').type("Ivan's Testing Blog")
        cy.get('#new-author-input').type("Ivan's Testing Author")
        cy.get('#new-url-input').type("http://www.ivanssampleurl/")
        cy.get('#new-blog-create-button').click()
      })

      it("A user can 'like' a blog", function() {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted by its creator', function() {
        cy.contains("Ivan's Testing Blog")
        cy.contains('remove').click()
        // cy.on('window:confirm', () => true);
        cy.get('.singleBlog').should('not.exist')
      })

      it('Blogs are sorted according to likes', function() {
        // Give first blog a few likes
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()
        cy.contains('likes 1')
        cy.contains('like').click()
        cy.contains('likes 2')
        cy.contains('like').click()
        cy.contains('likes 3')

        // Create new blog
        cy.get('.viewButton').contains('new blog').click()
        cy.get('#new-title-input').type("Ivan's 2nd Testing Blog")
        cy.get('#new-author-input').type("Ivan's Testing Author")
        cy.get('#new-url-input').type("http://www.ivanssampleurl/2nd")
        cy.get('#new-blog-create-button').click()
        // Verify the original blog is still the  top one
        cy.get('.singleBlog').eq(0).contains("Ivan's Testing Blog | Ivan's Testing Author")
        // Click view on new blog 
        cy.get('.singleBlog').eq(1).contains('view').click()
        // Like the new blog 4 times
      })
    })
  })
})