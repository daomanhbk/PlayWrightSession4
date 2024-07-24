import { test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json';
const userName = 'standard_user';
const password = 'secret_sauce';

setup( 'authenticate', async ({ page }) => {
    // Perform authentication steps
    await page.goto('/');
    await page.locator('[data-test="username"]').fill(userName);
    await page.locator('[data-test="password"]').fill(password);
    await page.locator('[data-test="login-button"]').click();
    
    // Wait until the page receives the cookies.
    //
    // Wait until the page reaches a state where all cookies are set
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    //
    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});