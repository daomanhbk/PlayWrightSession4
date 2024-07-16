import { test, expect } from '@playwright/test';

test('test Dropdown', async ({ page }) => {
  // Navigate the the page
  await page.goto('https://the-internet.herokuapp.com/');

  // Verify 'Welcome to the-internet' title is displayed
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');

  // Select 'Dropdown' link
  await page.getByRole('link', { name: 'Dropdown' }).click();

  // Verify 'Dropdown List' header title is displayed
  await expect(page.getByRole('heading')).toContainText('Dropdown List');

  // Select item by label 'Option 2' 
  await page.selectOption('#dropdown','Option 2');

  // Verify the current item is 'Option 2'
  let selectedAttributeValue = await page.locator('#dropdown option[value="2"]').getAttribute('selected');
  expect(selectedAttributeValue).toBe('selected');
  
  // Select item by index 1
  await page.selectOption('#dropdown', { index: 1 });

  // Verify the current item is 'Option 1'
  selectedAttributeValue = await page.locator('#dropdown option[value="1"]').getAttribute('selected');
  expect(selectedAttributeValue).toBe('selected');

  // Select item by value 2
  await page.selectOption('#dropdown', { value: '2' });

  // Verify the current item is 'Option 2'
  selectedAttributeValue = await page.locator('#dropdown option[value="2"]').getAttribute('selected');
  expect(selectedAttributeValue).toBe('selected');
});