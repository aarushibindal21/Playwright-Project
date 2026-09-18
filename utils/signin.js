import { expect } from "@playwright/test";

async function signInUser(page) {
    await page.locator('#userName').fill('testuser123');
    
        // Enter password
        await page.locator('#userPw').fill('Test@123');
    
        // Click Sign In
        await page.locator('.signin-form button').click();
    
        // Verify successful authentication / redirection to Homepage
        await expect(page).toHaveURL(/home/i);
}

export {signInUser}