import { test, expect } from '@playwright/test';

test('test Drag and Drop', async ({ page }) => {
  // Navigate the the page
  await page.goto('https://the-internet.herokuapp.com/');

  // Verify 'Welcome to the-internet' title is displayed
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');

  // Select 'Drag and Drop' link
  await page.getByRole('link', { name: 'Drag and Drop' }).click();

  // Verify 'Drag and Drop' header title is displayed
  await expect(page.getByRole('heading')).toContainText('Drag and Drop');

  // Store the column A and column B locator
  const source = page.locator('#column-a');
  const target = page.locator('#column-b');

  // Verify the source column is column A, the target column is column B
  await expect(source).toContainText('A');
  await expect(target).toContainText('B');

  // Drag and Drop column A to column B
  await source.dragTo(target);

  // Verify 'Column A changed to column B, Column B changed to column A
  await expect(source).toContainText('B');
  await expect(target).toContainText('A');
});