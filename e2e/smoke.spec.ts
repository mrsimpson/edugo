import { test, expect } from '@playwright/test'

/**
 * Smoke tests for the edugo platform.
 *
 * Run against the live site by default (baseURL = https://mrsimpson.github.io/edugo/).
 * Set BASE_URL to test a local preview build:
 *   BASE_URL=http://localhost:4173/edugo/ npx playwright test
 *
 * KD-33: The SPA uses hash routing deployed at /edugo/.
 * We use relative paths (`./`) so that Playwright appends them to baseURL correctly:
 *   baseURL=https://mrsimpson.github.io/edugo/  +  ./#/catalog
 *   → https://mrsimpson.github.io/edugo/#/catalog  ✓
 */

test.describe('Landing page', () => {
  test('loads and shows the hero headline', async ({ page }) => {
    await page.goto('./')
    await expect(page).toHaveTitle(/edugo/i)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Deutschlands Schulen')
  })

  test('skip navigation link is present', async ({ page }) => {
    await page.goto('./')
    await expect(page.locator('a[href="#main-content"]')).toBeAttached()
  })

  test('CTA links to /apps', async ({ page }) => {
    await page.goto('./')
    // Multiple "Tools entdecken" CTAs exist (one per persona tab) — check the first
    const cta = page.getByRole('link', { name: /tools entdecken/i }).first()
    await expect(cta).toBeVisible()
    await expect(cta).toHaveAttribute('href', /#\/apps/)
  })
})

test.describe('Capability catalog (#/catalog)', () => {
  test('renders the page title and at least one node card', async ({ page }) => {
    await page.goto('./#/catalog')
    await expect(page.getByRole('heading', { name: /Kompetenzkarte/i })).toBeVisible()
    // Cards are router-links with role="listitem" and aria-label="Kompetenz: ..."
    await expect(page.getByRole('listitem', { name: /Kompetenz:/i }).first()).toBeVisible()
  })

  test('KMK filter panel is present', async ({ page }) => {
    await page.goto('./#/catalog')
    await expect(page.getByRole('complementary', { name: /filtern/i })).toBeVisible()
  })

  test('gap filter toggle works', async ({ page }) => {
    await page.goto('./#/catalog')
    const checkbox = page.getByRole('checkbox', { name: /fehlende und teilweise/i })
    await expect(checkbox).toBeVisible()
    await checkbox.check()
    await expect(page).toHaveURL(/#\/catalog.*gap=true/)
  })
})

test.describe('Apps / registry (#/apps)', () => {
  test('renders the page title and at least one entry card', async ({ page }) => {
    await page.goto('./#/apps')
    await expect(page.getByRole('heading', { name: /^Apps$/i })).toBeVisible()
    // Cards are router-links with role="listitem" and aria-label="Tool: ..."
    await expect(page.getByRole('listitem', { name: /Tool:/i }).first()).toBeVisible()
  })

  test('DSGVO filter panel is present', async ({ page }) => {
    await page.goto('./#/apps')
    await expect(page.getByRole('complementary', { name: /filtern/i })).toBeVisible()
  })
})

test.describe('Capability node detail', () => {
  test('renders heading and markdown body for argumente-bewerten', async ({ page }) => {
    await page.goto('./#/catalog/argumente-bewerten')
    await expect(page.getByRole('heading', { name: /Argumente/i })).toBeVisible()
    // Markdown body rendered via marked — check at least one h2 in the body region
    await expect(page.locator('[aria-label="Beschreibung der Kompetenz"] h2').first()).toBeVisible()
  })
})

test.describe('Registry entry detail', () => {
  test('renders heading and markdown body for essayvergleich', async ({ page }) => {
    await page.goto('./#/apps/essayvergleich-kritisches-denken')
    await expect(page.getByRole('heading', { name: /Essay/i })).toBeVisible()
    // Markdown body rendered via marked — check at least one h2 in the body region
    await expect(page.locator('[aria-label="Beschreibung des Tools"] h2').first()).toBeVisible()
  })
})

test.describe('VitePress docs', () => {
  test('/docs/ serves a page', async ({ page }) => {
    await page.goto('./docs/')
    await expect(page).not.toHaveTitle(/404/i)
  })
})

test.describe('404 handling', () => {
  test('unknown hash route does not crash', async ({ page }) => {
    await page.goto('./#/this-route-does-not-exist')
    await expect(page.locator('body')).not.toBeEmpty()
  })
})
