 import { test, expect } from '@playwright/test';
import { signupUser } from "../utils/auth";
import { signInUser } from "../utils/signin";

test('WL-01 - Verify a recipe can be added to and removed from the Wishlist via the heart icon', async ({ page }) => {

    // Sign up and sign in user
    await signupUser(page);
    await signInUser(page);

    // Click Recipes link
    await page.getByRole('banner')
        .getByRole('link', { name: 'RECIPES', exact: true })
        .click();

    // Locate Avakai Chicken Biryani recipe card
    const recipeCard = page.locator('.card').filter({
        hasText: 'Avakai Chicken Biryani'
    });

    // Verify recipe card is displayed
    await expect(recipeCard).toBeVisible();

    // Locate heart icon on the recipe card
    const heartIcon = recipeCard.locator('.photo i.fa-heart');

    // Verify heart icon is in unliked state
    await expect(heartIcon).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Click heart icon to add to Wishlist
    await heartIcon.click();

    // Verify heart icon changes to liked state
    await expect(heartIcon).not.toHaveCSS('color', 'rgb(255, 255, 255)');

    // Navigate to Wishlist page
    await page.locator('#wishlist-btn').click();

    // Verify Avakai Chicken Biryani appears in the Wishlist
    await expect(
        page.locator('.card').filter({ hasText: 'Avakai Chicken Biryani' })
    ).toBeVisible();

    // Navigate back to Recipes page
    await page.getByRole('banner')
        .getByRole('link', { name: 'RECIPES', exact: true })
        .click();

    // Click heart icon again to remove from Wishlist
    await recipeCard.locator('.photo i.fa-heart').click();

    // Verify heart icon returns to unliked state
    await expect(heartIcon).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Navigate to Wishlist page
    await page.locator('#wishlist-btn').click();

    // Verify Avakai Chicken Biryani is removed from the Wishlist
    await expect(
        page.locator('.card').filter({ hasText: 'Avakai Chicken Biryani' })
    ).not.toBeVisible();
});
