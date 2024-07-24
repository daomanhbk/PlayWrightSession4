import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
});

test.skip('TC001 Verify Checkboxes', { tag: '@regression' }, async ({ page }) => {
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

test('TC002 Verify Drag And_Drop', { tag: '@regression' }, async ({ page }) => {
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

test.fail('TC003 Verif Dropdown', { tag: '@regression' }, async ({ page }) => {
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

test('TC005 Verify Upload File', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
// Verify 'Welcome to the-internet' title is displayed
await expect(page.locator('h1')).toContainText('Welcome to the-internet');

// Select 'File Upload' link
await page.getByRole('link', { name: 'File Upload' }).click();

// Verify 'File Uploader' header title is displayed
await expect(page.getByRole('heading')).toContainText('File Uploader');

// Click on File Upload
await page.locator('#file-upload').click();

// Select the file
await page.locator('#file-upload').setInputFiles('./tests/TC005_UploadFile.txt');

// Click on the Upload button
await page.getByRole('button', { name: 'Upload' }).click();

// Verify the file is uploaded
await expect(page.locator('#uploaded-files')).toContainText('TC005_UploadFile.txt');
});

test('TC006 Dynamically Loaded Page Elements', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
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