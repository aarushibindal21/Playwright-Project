import { test, expect } from '@playwright/test';
import { signupUser } from "../utils/auth";
import { signInUser } from "../utils/signin";

test('RP-01 - Verify selecting a category filters recipes correctly', async ({ page }) => {

    // Sign up and sign in user
    await signupUser(page);
    await signInUser(page);

    // Click Recipes link
    await page.getByRole('banner')
        .getByRole('link', { name: 'RECIPES', exact: true })
        .click();

    // Locate the Biryani's category button
    const biryanisCategory = page.locator('catbutton.catButton').filter({
        hasText: "Biryani's"
    });

    // Verify Biryani's category button is displayed
    await expect(biryanisCategory).toBeVisible();

    // Click the Biryani's category button
    await biryanisCategory.click();

    // Locate all displayed recipe cards
    const recipeCards = page.locator('.card');

    // Verify at least one recipe card is displayed after filtering
    await expect(recipeCards.first()).toBeVisible();

    // Get the count of displayed cards
    const cardCount = await recipeCards.count();

    // Verify every displayed card belongs to the Biryani's category
    for (let i = 0; i < cardCount; i++) {
        const cardText = await recipeCards.nth(i).textContent();
        expect(cardText?.toLowerCase()).toContain('biryani');
    }
});

test('RP-02 - Verify only Admin users can access the add-recipe functionality', async ({ page }) => {

    // Sign up and sign in as a normal user
    await signupUser(page);
    await signInUser(page);

    // Click Recipes link
    await page.getByRole('banner')
        .getByRole('link', { name: 'RECIPES', exact: true })
        .click();

    // Locate the add-recipe (+) button
    const addButton = page.locator('.add i.fa-solid.fa-plus');

    // Verify add-recipe button is visible to normal user
    await expect(addButton).toBeVisible();

    // Listen for the alert dialog before clicking
    page.once('dialog', async (dialog) => {

        // Verify the alert message restricts non-admin access
        expect(dialog.message().toLowerCase()).toContain('only admin');

        // Dismiss the alert
        await dialog.dismiss();
    });

    // Click the add-recipe (+) button as normal user
    await addButton.click();
});

test.only('RP-03 - Verify recipe cards and category cards render correctly', async ({ page }) => {

    // Sign up and sign in user
    await signupUser(page);
    await signInUser(page);

    // Click Recipes link
    await page.getByRole('banner')
        .getByRole('link', { name: 'RECIPES', exact: true })
        .click();

    // Verify categories section is visible
    await expect(page.locator('.categories')).toBeVisible();

    // Verify at least one category button is rendered
    const categoryButtons = page.locator('catbutton.catButton');
    await expect(categoryButtons.first()).toBeVisible();

    // Verify card container is visible
    await expect(page.locator('.card_container')).toBeVisible();

    // Locate all recipe cards
    const recipeCards = page.locator('.card');

    // Verify at least one recipe card is rendered
    await expect(recipeCards.first()).toBeVisible();

    const cardCount = await recipeCards.count();

    for (let i = 0; i < cardCount; i++) {
        const card = recipeCards.nth(i);

        // Verify card photo (image) is visible
        await expect(card.locator('.photo img')).toBeVisible();

        // Verify recipe name is visible
        await expect(card.locator('.name').first()).toBeVisible();

        // Verify star rating section is visible
        await expect(card.locator('.stars')).toBeVisible();

        // Verify wishlist (heart) icon is visible
        await expect(card.locator('.photo i.fa-heart')).toBeVisible();
    }
});
