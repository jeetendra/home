import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
    headless: false,
    args: [`--window-size=1920,1080`],
    defaultViewport: {
      width:1024,
      height:768
    },
    devtools: true
});

const context = browser.defaultBrowserContext();
await context.overridePermissions('https://chartink.com',['clipboard-read']);

const page = await browser.newPage();

const x = await page.goto('https://chartink.com/screener/3-days-only-alpha-one');

await page.click('.btn-group > .buttons-copy');

const text = await page.evaluate(() => navigator.clipboard.readText())

console.log(text)

await browser.close();