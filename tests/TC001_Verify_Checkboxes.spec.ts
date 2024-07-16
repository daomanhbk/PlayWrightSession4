import { test, expect } from '@playwright/test';

test('test Checkboxes', async ({ page }) => {
  // Navigate the the page
  await page.goto('https://the-internet.herokuapp.com/');

  // Verify 'Welcome to the-internet' title is displayed
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');

    // Select 'Checkboxes' link
  await page.getByRole('link', { name: 'Checkboxes' }).click();

    // Verify 'Checkboxes' header title is displayed
  await expect(page.getByRole('heading')).toContainText('Checkboxes');

  //  Check 'checkbox1'
  await page.getByRole('checkbox').first().check();

  // 'checkbox1' is checked
  await page.getByRole('checkbox').nth(1).uncheck();

  // Uncheck 'checkbox 2'
  await expect(page.getByRole('checkbox').first()).toBeChecked();

  // 'checkbox 2' is un-checked
  await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();
});