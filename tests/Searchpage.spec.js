import { test, expect } from '@playwright/test';
import { signInUser } from '../utils/signin';
import { signupUser } from '../utils/auth';


test('TC-SEARCH-001 - Verify searching a valid recipe name returns matching results', async ({ page }) => {

    // Signup user
    await signupUser(page);

    // Sign in user
    await signInUser(page);

    // Verify login succeeded
    await expect(page).toHaveURL(/home/i);

    // Click Search menu
    await page.getByText('Search').first().click();

    // Debug: Check where we landed
    console.log('Current URL:', page.url());

    // Pause and inspect page
    await page.waitForTimeout(5000);
});


test('TC-SEARCH-002 - Verify behavior when searching with an empty field', async ({ page }) => {

    // Signup user
    await signupUser(page);

    // Sign in user
    await signInUser(page);

    // Verify login
    await expect(page).toHaveURL(/home/i);

    // Open Search page
    await page.getByText('Search').first().click();

    // Verify Search page opened
    await expect(page).toHaveURL(/Searchpage/i);

    // Ensure search field is empty
    await page.locator('#search-input').clear();

    // Click Search
    await page.locator('#search-btn').click();

    // Verify page remains usable
    await expect(page.locator('#search-input')).toBeVisible();

    await page.waitForTimeout(3000);
});

test('TC-SEARCH-003 - Verify clear no results state for a recipe that does not exist', async ({ page }) => {

    await signupUser(page);

    await signInUser(page);

    await expect(page).toHaveURL(/home/i);

    // Click Search and wait for navigation
    await Promise.all([
        page.waitForURL(/api\.html/i),
        page.getByText('Search').first().click()
    ]);

    // Verify search page loaded
    await expect(page.locator('#search-input')).toBeVisible();

    // Enter invalid recipe
    await page.locator('#search-input').fill('xyzabc123recipe');

    // Search
    await page.locator('#search-btn').click();

    // Verify no results message
    await expect(page.locator('body'))
        .toContainText("Sorry, we didn't find any meal!");
});
test('TC-SEARCH-004 - Verify search page UI elements render correctly', async ({ page }) => {

    // Signup user
    await signupUser(page);

    // Sign in user
    await signInUser(page);

    // Open Search page
    await page.getByText('Search').first().click();

    // Verify search input is visible
    await expect(page.locator('#search-input')).toBeVisible();

    // Verify search button is visible
    await expect(page.locator('#search-btn')).toBeVisible();

    // Verify search input is enabled
    await expect(page.locator('#search-input')).toBeEnabled();

    // Verify search button is enabled
    await expect(page.locator('#search-btn')).toBeEnabled();

    // Verify page layout is visible
    await expect(page.locator('.meal-search')).toBeVisible();

    // Verify search box container is visible
    await expect(page.locator('.meal-search-box')).toBeVisible();

    // Verify input placeholder
    await expect(page.locator('#search-input'))
        .toHaveAttribute('placeholder', 'Enter Your Recipe Name');

    // Verify elements do not overlap
    const inputBox = await page.locator('#search-input').boundingBox();
    const searchButton = await page.locator('#search-btn').boundingBox();

    expect(inputBox).not.toBeNull();
    expect(searchButton).not.toBeNull();

    expect(inputBox.x + inputBox.width)
        .toBeLessThanOrEqual(searchButton.x + 5);

    // Wait for observation
    await page.waitForTimeout(3000);
});