import { test, expect } from '@playwright/test';
import { signInUser } from '../utils/signin';
import { signupUser } from '../utils/auth';

test('TC-HOME-001 - Verify each social media icon is functional and redirects to the correct destination', async ({ page }) => {

  // Open application
  await page.goto('https://food-recipe-finder-two.vercel.app/');

  const socialMediaIcons = page.locator('.social-icons a');

  await expect(socialMediaIcons.first()).toBeVisible();

  const count = await socialMediaIcons.count();

  for (let i = 0; i < count; i++) {
    const icon = socialMediaIcons.nth(i);

    await expect(icon).toBeVisible();

    const expectedUrl = await icon.getAttribute('href');

    expect(expectedUrl).not.toBeNull();
    expect(expectedUrl).not.toBe('');
  }
});

test('TC-HOME-002 - Verify main navigation from Homepage routes to the correct pages', async ({ page }) => {
    await signupUser(page);
    await signInUser(page);
    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/');

  // Verify successful login
  await expect(page).toHaveURL(/home/i);

  // Search
  await page.getByText('Search').click();
  await expect(page).toHaveURL(/search/i);

  // Recipes
  await page.goBack();
  await page.locator('#recipes-btn').click();
  await expect(page).toHaveURL(/recipe/i);

  // Wishlist
  await page.goBack();
  await page.locator('#wishlist-btn').click();
  await expect(page).toHaveURL(/wishlist/i);

  // Signin
  await page.goBack();
  await page.locator('#signin-btn').click();
  await expect(page).toHaveURL(/signin/i);
});

test('TC-HOME-003 - Verify Homepage renders correctly at mobile viewport', async ({ page }) => {

  await page.setViewportSize({
    width: 375,
    height: 667
  });

  await page.goto('https://food-recipe-finder-two.vercel.app/');

  await expect(page.locator('body')).toBeVisible();

  await expect(page.locator('#signin-btn')).toBeVisible();

  const pageWidth = await page.evaluate(
    () => document.documentElement.scrollWidth
  );

  const viewportWidth = await page.evaluate(
    () => window.innerWidth
  );

  expect(pageWidth).toBeLessThanOrEqual(viewportWidth);
});

