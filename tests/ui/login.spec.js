const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.describe('Login UI Tests', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await page.goto('/login.html');
    await page.evaluate(() => localStorage.clear());
    await loginPage.navigateToLogin();
  });

  test('should display login page correctly', async ({ page }) => {
    await loginPage.verifyLoginPageLoaded();
  });

  test('should show error with empty credentials', async ({ page }) => {
    await loginPage.submit();

    const emailRequired = await page.locator(loginPage.emailInput).getAttribute('required');
    const passwordRequired = await page.locator(loginPage.passwordInput).getAttribute('required');

    expect(emailRequired).not.toBeNull();
    expect(passwordRequired).not.toBeNull();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid@example.com', 'wrongpassword');

    await loginPage.waitForErrorMessage();

    const errorVisible = await loginPage.isErrorVisible();
    expect(errorVisible).toBe(true);

    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Invalid credentials');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test123!';

    await page.request.post('/api/auth/register', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    await loginPage.login(testEmail, testPassword);

    await dashboardPage.waitForDashboardLoad();
    await expect(page).toHaveURL(/.*dashboard\.html/);

    await dashboardPage.verifyDashboardLoaded();
  });

  test('should redirect to dashboard if already logged in', async ({ page }) => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test123!';

    await page.request.post('/api/auth/register', {
      data: {
        email: testEmail,
        password: testPassword
      }
    });

    const loginResponse = await page.request.post('/api/auth/login', {
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

    await loginPage.navigateToLogin();

    await page.waitForURL(/.*dashboard\.html/, { timeout: 5000 });
    await expect(page).toHaveURL(/.*dashboard\.html/);
  });
});