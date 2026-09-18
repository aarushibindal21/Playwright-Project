async function signupUser(page) {

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

    // Enter confirm password
    await page.locator('#pw_c').fill('Test@123');

    // Click Signup
    await page.locator('.signup-form button').click();

    // Click Signin Button
    await page.locator("#signin-btn").click();
}

export { signupUser };