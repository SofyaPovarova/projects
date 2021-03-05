import playwright from "playwright";

describe(`clicking on bug`, () => {
    const AUTH_URL = 'http://localhost:3000/auth';
    const BUGS_URL = 'http://localhost:3000/bugs';

    let browser = null;
    let page = null;

    beforeEach(async () => {
        browser = await playwright['chromium'].launch();
        page = await browser.newPage();
        await page.goto(AUTH_URL);
    });

    afterEach(async () => {
        await browser.close();
    });

    it(`auth page contains tab with login`, async () => {
        expect(page).not.toBeNull();
        expect(await page.innerText('#loginTab')).toBe("Login");
    });

    it('bugs page for not logged in', async () => {
        await page.goto(BUGS_URL);
        expect(await page.innerText('.info')).toBe("🗿 Please login first!");
    });

    it(`try to add bug without login`, async () => {
        await page.goto(BUGS_URL);
        await page.click('.bug');
        expect(await page.innerText('.info')).toBe("🗿 Please login first!");
    });

    it(`add bug`, async () => {
        await login('hell@mail.com', '123456')
        const infoText = await page.$eval('.info', el => el.innerText)
        const n = parseInt(infoText.match(/\d+/g)[0])
        await page.click('.bug');
        const bugsAfter = n + 1
        expect(await page.innerText('.info')).toBe(`🗿 hell@mail.com fixed ${bugsAfter} bugs!`);
    });

    it(`logout`, async () => {
        await login('hell@mail.com', '123456')
        expect(await page.innerText('.info')).not.toBe(`🗿 Please login first!`);
        await page.click('#logout');
        await page.goto(BUGS_URL);
        expect(await page.innerText('.info')).toBe(`🗿 Please login first!`);
    });


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
});