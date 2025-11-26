const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',


  timeout: 30 * 1000,


  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,


  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list']
  ],


  use: {

    baseURL: process.env.BASE_URL || 'http://localhost:3000',


    trace: 'on-first-retry',


    screenshot: 'only-on-failure',


    video: 'retain-on-failure',


    actionTimeout: 10 * 1000,
  },


  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Uncomment to test on Firefox
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // Uncomment to test on WebKit
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Uncomment for mobile testing
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000/health',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});