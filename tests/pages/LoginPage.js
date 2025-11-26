const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailInput = '#email';
    this.passwordInput = '#password';
    this.submitButton = 'button[type="submit"]';
    this.errorMessage = '#error-message';
    this.loginForm = '#login-form';
  }

  async navigateToLogin() {
    await this.goto('/login.html');
  }

  async login(email, password) {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.submitButton);
  }

  async getErrorMessage() {
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  async isErrorVisible() {
    return await this.isVisible(this.errorMessage);
  }

  async waitForErrorMessage() {
    await this.page.waitForSelector(this.errorMessage, {
      state: 'visible',
      timeout: 5000
    });
  }

  async verifyLoginPageLoaded() {
    await expect(this.page.locator('h1')).toHaveText('Login');
    await expect(this.page.locator(this.emailInput)).toBeVisible();
    await expect(this.page.locator(this.passwordInput)).toBeVisible();
  }

  async fillEmail(email) {
    await this.fill(this.emailInput, email);
  }

  async fillPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  async submit() {
    await this.click(this.submitButton);
  }
}

module.exports = LoginPage;