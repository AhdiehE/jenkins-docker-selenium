const { Builder, By } = require("selenium-webdriver");
const { expect } = require("chai");

describe("Example.com Title Test", function () {
  this.timeout(30000); // allow time for Selenium setup

  let driver;

  this.beforeAll(async () => {
    driver = await new Builder()
      .usingServer("http://selenium-hub:4444/wd/hub") // ✅ Use Docker DNS
      .forBrowser("chrome")
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

//   it("should load example.com and check the title3", async () => {
//     console.log("Running forth test...");
//     await driver.get("https://example.com");
//     const title = await driver.getTitle();
//     expect(title).to.equal("Example Domain");
//   });

//   it("should load example.com and check the title4", async () => {
//     console.log("Running fifth test...");
//     await driver.get("https://example.com");
//     const title = await driver.getTitle();
//     expect(title).to.equal("Example Domain");
//   });

  this.afterAll(async () => {
    if (driver) await driver.quit();
  });
});
