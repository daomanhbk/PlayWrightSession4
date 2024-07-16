import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    // Navigate to the page
  await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');

  // The page with 'Frames And Windows' text is shown
  await expect(page.locator('h1')).toContainText('Frames And Windows');

  // On the tab list, click "Iframe"
  await page.getByRole('tab', { name: 'iFrame' }).click();

  // The iframe is shown
  await expect(page.getByRole('strong')).toContainText('Below is an iFrame. If you want to perform any operation in this window, you will need to enter in this iframe.');

  // On the iframe, input the search with text "Playwright"
  await page.frameLocator('iframe[name="globalSqa"]').getByPlaceholder('Search...').fill('Playwright');

  // Click the Search button
  await page.frameLocator('iframe[name="globalSqa"]').getByRole('button').click();

  // There is a message: "Sorry, no posts matched your criteria." is displayed
  await page.frameLocator('iframe[name="globalSqa"]').getByText('Sorry, no posts matched your criteria.').isVisible();
});