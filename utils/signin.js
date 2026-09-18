import { expect } from '@playwright/test';

async function signInUser(page) {
  await page.locator('#userName').fill('testuser123');

  await page.locator('#userPw').fill('Test@123');

  await page.locator('.signin-form button').click();

  await expect(page).toHaveURL(/home/i);
}

export { signInUser };