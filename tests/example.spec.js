// @ts-check
const { test, expect } = require("@playwright/test");
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');


test("has title", async ({ page }) => {
  const browser = await chromium.launch();
  await page.goto("/blog/tutorial/selenium-tutorial/selenium-cheat-sheet/");
  const link = await page.getByRole('link', { name: 'Download the printable PDF of' });
  const url = await link.getAttribute('href');
  console.log('Link URL:', url);
  await page.waitForTimeout(5000);
  await link.click();
  await page.waitForTimeout(5000);

  if (url) {
    const downloadPath = path.resolve(__dirname, '../Selenium-Cheat-Sheet-2022.pdf');
    const file = fs.createWriteStream(downloadPath);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('pdf Download Completed');
      });
      console.log(`PDF has been downloaded and saved to ${downloadPath}`);
    })
  }
  else {
    console.log('Could not find the URL of the link');
  }
});
