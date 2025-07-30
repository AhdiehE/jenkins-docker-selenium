const { Builder, By } = require('selenium-webdriver');

const waitForSelenium = async (url, maxRetries = 10, delayMs = 3000) => {
  const axios = require('axios');
  for (let i = 0; i < maxRetries; i++) {
    try {
      await axios.get(url); // try to connect to Selenium
      console.log('Selenium Hub is ready');
      return;
    } catch {
      console.log(`Waiting for Selenium Hub... attempt ${i + 1}`);
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
  throw new Error('Selenium Hub not reachable after retries');
};

(async function runTest() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .usingServer('http://selenium-hub:4444/wd/hub') // selenium-hub from Docker network
    .build();

  try {
    await driver.get('https://example.com');
    let title = await driver.getTitle();
    console.log('Page title:', title);
  } finally {
    await driver.quit();
  }
})();
