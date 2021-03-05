const AUTH_URL = 'http://localhost:3000/auth';
const BUGS_URL = 'http://localhost:3000/bugs';

describe('My First Test', () => {
    it('auth page contains tab with login', () => {
        cy.visit(AUTH_URL)
        cy.get('#loginTab').should('have.text', "Login")
    })

    it('bugs page for not logged in', () => {
        cy.visit(BUGS_URL)
        cy.get('.info').should('have.text', "🗿 Please login first!")
    })

    it('try to add bug without login', () => {
        cy.visit(BUGS_URL)
        cy.get('.bug').click()
        cy.get('.info').should('have.text', "🗿 Please login first!")
    })

    it('add bug', async () => {
        await login()
        cy.get('.info').should('not.have.text', "🗿 Please login first!")
        cy.get('.info').then(($info) => {
            const innerText = $info.text()
            const n = parseInt(innerText.match(/\d+/g)[0])
            cy.get('.info').should('not.have.text', "🗿 Please login first!")
            cy.get('.bug').click()
            const bugsAfter = n + 1
            cy.get('.info').should('have.text', `🗿 hell@mail.com fixed ${bugsAfter} bugs!`)
        })
    })

    it('logout', async () => {
        await login()
        cy.get('.info').should('not.have.text', "🗿 Please login first!")
        cy.get('#logout')
        cy.visit(BUGS_URL)
        cy.get('.info').should('not.have.text', "🗿 Please login first!")
    })

    async function login() {
        await cy.visit(AUTH_URL)
        await cy.get('#email').type('hell@mail.com')
        await cy.get('#password').type('123456')
        await cy.get('#login').click()
        await cy.on('window:confirm', () => true);
        await cy.get('#go').click()
    }
})
