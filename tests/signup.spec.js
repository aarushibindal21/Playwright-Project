import { test, expect } from '@playwright/test';

test('TC-SIGNUP-001 - Verify new account can be created with valid details', async ({ page }) => {

    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/');

    // Click Signup Button
    await page.locator("#signup-btn").click();

    // Enter username
    await page.locator('#name').fill('testuser123');

    // // Enter email
    await page.locator('#email').fill('test@example.com');

    // // Enter password
    await page.locator('#pw').fill('Test@123');

    // // Enter confirm password
    await page.locator('#pw_c').fill('Test@123');

    // // Click Signup
    await page.locator('.signup-form button').click();
    // Verify successful account creation / redirection
    // await expect(page).toHaveURL(/signin|home/i);
});


test('TC-SIGNUP-002 - Verify signup fails when password and confirm password do not match', async ({ page }) => {

    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/');

    // Click Signup Button
    await page.locator("#signup-btn").click();

    // Enter username
    await page.locator('#name').fill('testuser123');

    // Enter email
    await page.locator('#email').fill('test@example.com');

    // Enter password
    await page.locator('#pw').fill('Test@123');

    // Enter different confirm password
    await page.locator('#pw_c').fill('Test@456');

    // Click Signup
    await page.locator('.signup-form button').click();

    // Verify signup page is still displayed
    await expect(page.locator('.signup-form')).toBeVisible();
});


test('TC-SIGNUP-003 - Verify signup fails when the email is not in a valid format', async ({ page }) => {

    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/');

    // Click Signup Button
    await page.locator("#signup-btn").click();

    // Enter username
    await page.locator('#name').fill('testuser123');

    // Enter invalid email
    await page.locator('#email').fill('testexample.com');

    // Enter password
    await page.locator('#pw').fill('Test@123');

    // Enter confirm password
    await page.locator('#pw_c').fill('Test@123');

    // Click Signup
    await page.locator('.signup-form button').click();

    // Verify signup does not proceed
    await expect(page.locator('.signup-form')).toBeVisible();

    await page.pause();
    
});


test.only('TC-SIGNUP-004 - Verify signup form renders correctly and show/hide password icons work', async ({ page }) => {

    // Open application
    await page.goto('https://food-recipe-finder-two.vercel.app/');

    // Click Signup Button
    await page.locator("#signup-btn").click();

    // Verify username field is visible
    await expect(page.locator('#name')).toBeVisible();

    // Verify email field is visible
    await expect(page.locator('#email')).toBeVisible();

    // Verify password field is visible
    await expect(page.locator('#pw')).toBeVisible();

    // Verify confirm password field is visible
    await expect(page.locator('#pw_c')).toBeVisible();

    // Verify Signup button is visible
    await expect(page.locator('.signup-form button')).toBeVisible();

    // Enter password
    await page.locator('#pw').fill('Test@123');

    // Verify password is masked
    await expect(page.locator('#pw')).toHaveAttribute('type', 'password');

    // Click eye icon for password
    await page.locator('#pw').locator('xpath=following-sibling::*[1]').click();

    // Verify password is visible
    await expect(page.locator('#pw')).toHaveAttribute('type', 'text');

    // Enter confirm password
    await page.locator('#pw_c').fill('Test@123');

    // Verify confirm password is masked
    await expect(page.locator('#pw_c')).toHaveAttribute('type', 'password');

    // Click eye icon for confirm password
    await page.locator('#pw_c').locator('xpath=following-sibling::*[1]').click();

    // Verify confirm password is visible
    await expect(page.locator('#pw_c')).toHaveAttribute('type', 'text');
});