import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // Folder containing test cases
  testDir: './tests',

  // Run tests sequentially for now
  fullyParallel: false,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Number of parallel workers
  workers: 1,

  // Reporter
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  // Common settings for all tests
  use: {
    // Your application URL
    baseURL: 'https://food-recipe-finder-two.vercel.app/',

    // Run browser in normal mode
    headless: false,

    // Capture information useful for failure analysis
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    // Timeout for actions such as click/fill
    actionTimeout: 10000,

    // Timeout for navigation
    navigationTimeout: 30000,
  },

  // Browser
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});