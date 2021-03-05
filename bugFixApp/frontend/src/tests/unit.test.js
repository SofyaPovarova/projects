import puppeteer from "puppeteer";
import {getRandomCoordinates} from "../../pages/fixing-bugs/bug";
import {generateText} from "../../pages/fixing-bugs/fixing-bugs-page";

describe('text generation', () => {
    test('should ask to login', async () => {
        const props = generateText(undefined, 0).props
        expect(props.children.length).toBe(3)
        expect(props.children[0]).toBe("🗿 Please ")
        expect(props.children[2]).toBe(" first!")
    })

    test('Joe 100500', async () => {
        const props = generateText('Joe', 100500).props
        expect(props.children).toBe("🗿 Joe fixed 100500 bugs!")
    })
})

describe('bugs placement', () => {
    let browser;
    let page;

    beforeAll(async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args:['--start-maximized']
        })

        page = await browser.newPage();
        await page.goto(
            "http://localhost:3000/bugs"
        )

        await page.waitForSelector(".bugsArea")
    });

    test('should generate coordinates inside the area', async () => {
        const bg = await page.$('.bugsArea')
        const ideaRectangle = await bg.boundingBox();

        const {randomX, randomY} = getRandomCoordinates(ideaRectangle)
        expect(randomX).toBeGreaterThan(ideaRectangle.x)
        expect(randomX).toBeLessThan(ideaRectangle.x + ideaRectangle.width)
        expect(randomY).toBeGreaterThan(ideaRectangle.y)
        expect(randomY).toBeLessThan(ideaRectangle.y + ideaRectangle.height)
    })

    test('should generate different coordinates', async () => {
        const bg = await page.$('.bugsArea')
        const ideaRectangle = await bg.boundingBox();
        const {randomX, randomY} = getRandomCoordinates(ideaRectangle)
        const sndCoordinates = getRandomCoordinates(ideaRectangle)

        expect(randomX).not.toEqual(sndCoordinates.randomX)
        expect(randomY).not.toEqual(sndCoordinates.randomY)
    })

    afterAll(async () => {
        browser.close();
    })
})



