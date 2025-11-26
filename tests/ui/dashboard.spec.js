const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.describe('Dashboard UI Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto('/login.html');
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect to login when not authenticated', async ({ page }) => {
    await dashboardPage.navigateToDashboard();

    await page.waitForURL(/.*login\.html/, { timeout: 5000 });
    await expect(page).toHaveURL(/.*login\.html/);
  });

  test('should display user email on dashboard', async ({ page }) => {
    // Register and login a user
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test123!';

    await page.request.post('http://localhost:3000/api/auth/register', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    await loginPage.navigateToLogin();
    await loginPage.login(testEmail, testPassword);

    await dashboardPage.waitForDashboardLoad();

    await dashboardPage.verifyUserEmail(testEmail);
  });

  test('should logout successfully', async ({ page }) => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test123!';

    await page.request.post('http://localhost:3000/api/auth/register', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const loginResponse = await page.request.post('http://localhost:3000/api/auth/login', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const { token } = await loginResponse.json();

    await page.evaluate(({ token, email }) => {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_email', email);
    }, { token, email: testEmail });

    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();


    await dashboardPage.clickLogout();


    await page.waitForURL(/.*login\.html/, { timeout: 5000 });
    await expect(page).toHaveURL(/.*login\.html/);


    const tokenAfterLogout = await page.evaluate(() => localStorage.getItem('auth_token'));
    expect(tokenAfterLogout).toBeNull();
  });

  test('should display dashboard elements correctly', async ({ page }) => {

    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test123!';

    await page.request.post('http://localhost:3000/api/auth/register', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const loginResponse = await page.request.post('http://localhost:3000/api/auth/login', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const { token } = await loginResponse.json();


    await page.evaluate(({ token, email }) => {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_email', email);
    }, { token, email: testEmail });

    await dashboardPage.navigateToDashboard();
    await dashboardPage.waitForDashboardLoad();


    await dashboardPage.verifyDashboardLoaded();


    await expect(page.locator('.card').first()).toBeVisible();


    await expect(page.locator('.nav-brand')).toHaveText('QA Boilerplate');
  });
});