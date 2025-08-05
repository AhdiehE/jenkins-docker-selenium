import { Builder, By } from "selenium-webdriver";
import { expect } from "chai";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import os from "os";
import path from "path";

describe("Example.com Title Test", function () {
  this.timeout(30000); // allow time for Selenium setup

  let driver;

  // Create a unique temp dir for Chrome's user data
  const tmpUserDataDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "chrome-profile-")
  );

  this.beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments(`--user-data-dir=${tmpUserDataDir}`);
    options.addArguments(
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage"
    );

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      // .usingServer("http://selenium-hub:4444/wd/hub") // ✅ Uncomment for Selenium Grid
      .build();
  });

  it("should load example.com and check the title", async () => {
    console.log("Running first test...");
    await driver.get("https://example.com");
    const title = await driver.getTitle();
    expect(title).to.equal("Example Domain");
  });

  it("should load example.com and check the title1", async () => {
    console.log("Running second test...");
    await driver.get("https://example.com");
    const title = await driver.getTitle();
    expect(title).to.equal("Example Domain");
  });

  it("should load example.com and check the title2", async () => {
    console.log("Running third test...");
    await driver.get("https://example.com");
    const title = await driver.getTitle();
    expect(title).to.equal("Example Domain");
  });

  it("should load example.com and check the title3", async () => {
    console.log("Running fourth test...");
    await driver.get("https://example.com");
    const title = await driver.getTitle();
    expect(title).to.equal("Example Domain");
  });

  this.afterAll(async () => {
    if (driver) await driver.quit();
  });
});
