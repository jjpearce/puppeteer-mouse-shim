const puppeteer = require('puppeteer');
const mouse2 = require('./mouse2.plugin.js');

(async () => {
    mouse2.patchMouse(puppeteer);
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage();
    await page.goto('https://example.com');
    await page.mouse.move(0,0);
    await page.mouse.move(400,400);
    await page.mouse.up();
    await page.screenshot({path: './example.png'});
    await browser.close();
})();