import puppeteer from "puppeteer";
import APIAuth from "../../api/bugFix/api-auth";

describe('bugs placement', () => {
    let browser;
    let page;

    beforeAll(async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        })

        page = await browser.newPage();
        await page.goto("http://localhost:3000/bugs")

        await page.waitForSelector(".bugsArea")
    });

    test('bug should not change position if not logged in', async () => {
        const bug = await page.$('.bug')
        const bugRectangleBefore = await bug.boundingBox();
        await page.click('.bug')
        const bugRectangleAfter = await bug.boundingBox();
        expect(bugRectangleBefore.x).toEqual(bugRectangleAfter.x)
        expect(bugRectangleBefore.y).toEqual(bugRectangleAfter.y)
    })

    test('bug should change position if logged in', async () => {
        await login()
        const bug = await page.$("#bug")
        const bugRectangleBefore = await bug.boundingBox()
        await page.click('#bug')
        const bugRectangleAfter = await bug.boundingBox()
        expect(bugRectangleBefore.x).not.toEqual(bugRectangleAfter.x)
        expect(bugRectangleBefore.y).not.toEqual(bugRectangleAfter.y)
    })

    async function login() {
        await page.goto("http://localhost:3000/auth")
        await page.type('#email', 'hell@mail.com')
        await page.type('#password', '123456')
        await page.waitForSelector("#login", {disabled: false})
        await page.click("button#login")
        await page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await page.waitForSelector("#go", {disabled: false})
        await page.click("#go")
    }

    afterAll(async () => {
        browser.close();
    })
})
