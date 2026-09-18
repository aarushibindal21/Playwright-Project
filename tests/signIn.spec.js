import { test, expect } from '@playwright/test';
import { signupUser } from '../utils/auth.js';

test('TC-SIGNIN-001 - Verify user can sign in with valid credentials', async ({ page }) => {

    // Signup user and open Signin page
    await signupUser(page);

    // Enter username
    await page.locator('#userName').fill('testuser123');

    // Enter password
    await page.locator('#userPw').fill('Test@123');

    // Click Sign In
    await page.locator('.signin-form button').click();

    // Verify successful authentication / redirection to Homepage
    await expect(page).toHaveURL(/home/i);
});


test('TC-SIGNIN-002 - Verify login fails with an incorrect password', async ({ page }) => {

    // Signup user and open Signin page
    await signupUser(page);

    // Enter username
    await page.locator('#userName').fill('testuser123');

    // Enter incorrect password
    await page.locator('#userPw').fill('Wrong@123');

    // Click Sign In
    await page.locator('.signin-form button').click();

    // Verify invalid password message
    await expect(page.locator('#Invalid_password')).toBeVisible();

    // Pause to observe UI
    await page.pause();


    
});
test('TC-SIGNIN-003 - Verify validation when username and password are left empty', async ({ page }) => {

    // Signup user and open Signin page
    await signupUser(page);

    // Leave username empty

    // Leave password empty

    // Click Sign In
    await page.locator('.signin-form button').click();

    // Verify required-field validation
    await expect(page.locator('#userName')).toHaveAttribute('required', '');
    await expect(page.locator('#userPw')).toHaveAttribute('required', '');

    // Verify login does not proceed
    await expect(page.locator('.signin-form')).toBeVisible();
    
});

test.only('TC-SIGNIN-004 - Verify password visibility can be toggled via the eye icon', async ({ page }) => {
    
    // Navigate to Signup page
    await signupUser(page);

    // First password field and its eye icon
    const passwordInput = page.locator('#pw');
    const toggleIcon = page.locator('.password-toggle-icon').first();

    // Enter password
    await passwordInput.fill('Test@123');

    // Verify password is masked by default
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click eye icon to show password
    await toggleIcon.click();

    // Verify password is visible
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Verify password value remains unchanged
    await expect(passwordInput).toHaveValue('Test@123');

    // Click eye icon again to hide password
    await toggleIcon.click();

    // Verify password is masked again
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Verify password value remains unchanged
    await expect(passwordInput).toHaveValue('Test@123');
    await page.pause();


});