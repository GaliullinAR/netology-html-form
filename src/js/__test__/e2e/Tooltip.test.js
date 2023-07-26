import puppeteer from "puppeteer";
import { fork } from 'child_process';


jest.setTimeout(30000);

describe('should tooltip show', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseURL = 'http://localhost:9000';
  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });
  describe('Creating tooltip', () => {
    test('should add tooltip in button', async () => {
      await page.goto(baseURL);
      const documentBody = await page.$('body');

      const button = await documentBody.$('.btn');
      button.click();
      await page.waitForSelector('.tooltip-message');
    });
  });
})


