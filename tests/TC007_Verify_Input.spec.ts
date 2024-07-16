import { test, expect } from '@playwright/test';

test('test input', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://testautomationpractice.blogspot.com/');

  // The header is displayed
  await expect(page.locator('h1')).toContainText('Automation Testing Practice');

  await page.locator('#name').fill('Name Test');
  await expect(page.locator('#name')).toHaveValue('Name Test');

  await page.getByLabel('Address:').fill('Address Test');
  await expect(page.getByLabel('Address:')).toHaveValue('Address Test');

  await page.locator('#name').clear();
  await expect(page.locator('#name')).toBeEmpty();

  await page.getByLabel('Address:').clear();
  await expect(page.getByLabel('Address:')).toBeEmpty();
});