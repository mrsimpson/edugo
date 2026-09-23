import { defineConfig, devices } from '@playwright/test'

/**
 * Smoke test config. Tests run against the production URL by default.
 * Set BASE_URL env var to test a local preview build instead.
 *
 * KD-33: The SPA uses hash routing, so all routes are /#/... — no server
 * config needed for deep links.
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // The app is deployed at /edugo/ on GitHub Pages. BASE_URL can override
    // for local preview: BASE_URL=http://localhost:4173/edugo/
    baseURL: process.env.BASE_URL ?? 'https://mrsimpson.github.io/edugo/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
