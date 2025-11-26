const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path) {
    await this.page.goto(path);
  }

  async waitForElement(selector, options = {}) {
    await this.page.waitForSelector(selector, { state: 'visible', ...options });
  }

  async click(selector) {
    await this.page.click(selector);
  }

  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async getURL() {
    return this.page.url();
  }

  async waitForNavigation(action) {
    await Promise.all([
      this.page.waitForNavigation(),
      action()
    ]);
  }

  async waitForURL(url, options = {}) {
    await this.page.waitForURL(url, options);
  }
}

module.exports = BasePage;
