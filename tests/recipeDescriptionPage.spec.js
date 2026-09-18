import { test, expect } from '@playwright/test';
import { signupUser } from "../utils/auth";
import { signInUser } from "../utils/signin";

test('TC-RECIPE-001 - Verify recipe details render correctly and Like button toggles state', async ({ page }) => {

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

    // Click Open Now button
    await recipeCard.locator('.learn-more').click();

    // Verify recipe name
    await expect(
        page.getByText('Avakai Chicken Biryani', { exact: true }).first()
    ).toBeVisible();

    // Verify recipe video is displayed
    await expect(page.locator('.video6 iframe')).toBeVisible();

    // Verify recipe description section is displayed
    await expect(page.locator('.left6_down')).toBeVisible();

    // Locate Like icon
    const likeIcon = page.locator('#icon61');

    // Verify Like icon is displayed
    await expect(likeIcon).toBeVisible();

    // Verify initial unliked state
    await expect(likeIcon).toHaveCSS('color', 'rgb(255, 255, 255)');

    // Click Like icon
    await likeIcon.click();

    // Verify Like icon changes to liked state
    await expect(likeIcon).not.toHaveCSS(
        'color',
        'rgb(255, 255, 255)'
    );

    // Click Like icon again to unlike
    await likeIcon.click();

    // Verify Like icon returns to unliked state
    await expect(likeIcon).toHaveCSS(
        'color',
        'rgb(255, 255, 255)'
    );
});


test.only('TC-RECIPE-002 - Verify YouTube link opens the correct video', async ({ page }) => {

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

    // Click Open Now button
    await recipeCard.locator('.learn-more').click();

    // Verify YouTube video is displayed
    const youtubeVideo = page.locator('.video6 iframe');
    await expect(youtubeVideo).toBeVisible();

    // Verify YouTube video URL is valid
    await expect(youtubeVideo).toHaveAttribute(
        'src',
        /youtube\.com\/embed\//
    );

});


test('TC-RECIPE-003 - Verify valid comment can be submitted and persists after refresh', async ({ page }) => {

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

    // Click Open Now button
    await recipeCard.locator('.learn-more').click();

    // Locate comment input
    const commentInput = page.locator('#in');

    // Verify comment input is displayed
    await expect(commentInput).toBeVisible();

    // Enter valid comment
    await commentInput.fill('This recipe looks delicious!');

    // Verify comment was entered
    await expect(commentInput)
        .toHaveValue('This recipe looks delicious!');

    // Click Submit
    await page.getByRole('button', { name: 'submit', exact: true }).click();

    // Verify submitted comment is displayed
    const submittedComment = page.locator('.comments6 .cmt1')
        .filter({ hasText: 'This recipe looks delicious!' });

    await expect(submittedComment).toBeVisible();

    // Refresh page
    await page.reload();

    // Verify comment persists after refresh
    await expect(
        page.locator('.comments6 .cmt1')
            .filter({ hasText: 'This recipe looks delicious!' })
    ).toBeVisible();
});



test('TC-RECIPE-004 - Verify comment field rejects empty and whitespace-only submissions', async ({ page }) => {

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

    // Click Open Now button
    await recipeCard.locator('.learn-more').click();

    // Locate comment input
    const commentInput = page.locator('#in');

    // Locate Submit button
    const submitButton = page.locator('.btn6');

    // Locate existing comments
    const comments = page.locator('.comments6 .cmt1');

    // Verify comment field is displayed
    await expect(commentInput).toBeVisible();

    // Get current number of comments
    const initialCommentCount = await comments.count();

    // Leave comment field empty
    await commentInput.fill('');

    // Click Submit
    await submitButton.click();

    // Verify no blank comment is created
    await expect(comments).toHaveCount(initialCommentCount);

    // Enter whitespace-only comment
    await commentInput.fill('   ');

    // Click Submit
    await submitButton.click();

    // Verify no whitespace-only comment is created
    await expect(comments).toHaveCount(initialCommentCount);
});