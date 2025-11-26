const BasePage = require('./BasePage');
const { expect } = require('@playwright/test');

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);

    this.userEmailNav = '#user-email';
    this.dashboardEmail = '#dashboard-email';
    this.logoutButton = '#logout-btn';
    this.navBrand = '.nav-brand';
    this.dashboardHeading = 'h1';
  }

  async navigateToDashboard() {
    await this.goto('/dashboard.html');
  }

  async getUserEmail() {
    return await this.getText(this.dashboardEmail);
  }

  async getUserEmailNav() {
    return await this.getText(this.userEmailNav);
  }

  async logout() {
    await this.click(this.logoutButton);
  }

  async isLoaded() {
    await this.waitForElement(this.dashboardHeading);
    return await this.isVisible(this.dashboardHeading);
  }

  async verifyDashboardLoaded() {
    await expect(this.page.locator(this.dashboardHeading)).toHaveText('Dashboard');
    await expect(this.page.locator(this.navBrand)).toBeVisible();
    await expect(this.page.locator(this.logoutButton)).toBeVisible();
  }

  async verifyUserEmail(expectedEmail) {
    await expect(this.page.locator(this.userEmailNav)).toHaveText(expectedEmail);
    await expect(this.page.locator(this.dashboardEmail)).toHaveText(expectedEmail);
  }

  async clickLogout() {
    await this.click(this.logoutButton);
  }

  async waitForDashboardLoad() {
    await this.page.waitForURL('**/dashboard.html');
    await this.waitForElement(this.dashboardHeading);
  }
}

module.exports = DashboardPage;