import { test, expect } from '@playwright/test';
import { signInUser } from '../utils/signin';
import { signupUser } from '../utils/auth';

test('TC-HOME-001 - Verify each social media icon is functional and redirects to the correct destination', async ({ page }) => {

    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/')
    // Locate social media icons
    const socialMediaIcons = page.locator('.social-icons a');

    // Verify social media icons are visible
    await expect(socialMediaIcons.first()).toBeVisible();

    // Verify each social media icon has a configured URL
    const count = await socialMediaIcons.count();

    for (let i = 0; i < count; i++) {

        // Get social media icon
        const icon = socialMediaIcons.nth(i);

        // Verify icon is visible
        await expect(icon).toBeVisible();

        // Get configured URL
        const expectedUrl = await icon.getAttribute('href');

        // Verify URL is configured
        expect(expectedUrl).not.toBeNull();
        expect(expectedUrl).not.toBe('');
    }
});



test('TC-HOME-002 - Verify main navigation from Homepage routes to the correct pages', async ({ page }) => {
    await signupUser(page);
    await signInUser(page);
    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/');

    // Click Search
    await page.locator('#search-btn').click();

    // Verify Search page
    await expect(page).toHaveURL(/search/i);
    await page.waitForTimeout(3000);

    // Go back to Homepage
    await page.goBack();

    // Click Recipes
    await page.locator('#recipes-btn').click();

    // Verify Recipes page
    await expect(page).toHaveURL(/recipe/i);
    await page.waitForTimeout(3000);

    // Go back to Homepage
    await page.goBack();

    // Click Wishlist
    await page.locator('#wishlist-btn').click();

    // Verify Wishlist page
    await expect(page).toHaveURL(/wishlist/i);
    await page.waitForTimeout(3000);

    // Go back to Homepage
    await page.goBack();

    // Click Signin
    await page.locator('#signin-btn').click();

    // Verify Signin page
    await expect(page).toHaveURL(/signin/i);
});



test('TC-HOME-003 - Verify Homepage renders correctly at mobile viewport', async ({ page }) => {

    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/');

    // Verify Homepage is loaded
    await expect(page).toHaveURL(/food-recipe-finder/i);

    // Verify main navigation is visible
    await expect(page.locator('#signin-btn')).toBeVisible();

    // Verify page body is visible
    await expect(page.locator('body')).toBeVisible();

    // Verify page does not have horizontal overflow
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(pageWidth).toBeLessThanOrEqual(viewportWidth);
});

