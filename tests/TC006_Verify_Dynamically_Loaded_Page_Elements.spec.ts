import { test, expect } from '@playwright/test';

test('test Dynamically Loaded Page Elements', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://the-internet.herokuapp.com/');

  // Verify 'Welcome to the-internet' title is displayed
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');

  // Select the 'Dynamic Loading' link
  await page.getByRole('link', { name: 'Dynamic Loading' }).click();

  // Verify 'Dynamically Loaded Page Elements' header title is displayed
  await expect(page.getByRole('heading')).toContainText('Dynamically Loaded Page Elements');
  await page.getByRole('link', { name: 'Example 1: Element on page' }).click();

  // Verify 'Example 1: Element on page that is hidden' page is loaded
  await expect(page.locator('#content')).toContainText('Example 1: Element on page that is hidden');

  // Click on the Start button
  await page.getByRole('button', { name: 'Start' }).click();  

  // Wait for the Loading element to appear
  const testLocator = page.locator('#loading');
  await testLocator.waitFor({ state: 'visible'})

  // Wait for the Loading element to disappear
  await testLocator.waitFor({ state: 'hidden'})

  // The message  "Hello World" is displayed
  const finishLocator = page.locator('#finish');
  await finishLocator.waitFor({ state: 'visible'})
  await expect(finishLocator).toContainText('Hello World');
});