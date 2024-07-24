import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
});

test('TC007 Verify Input', { tag: '@regression' }, async ({ page }) => {
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

test('TC008 Verify Prompt Dialog', { tag: ['@regression', '@smoke'] }, async ({ page }) => {
  // The header is displayed
  await expect(page.locator('h1')).toContainText('Automation Testing Practice');

  // Click "Prompt" button to trigger
  await page.getByRole('button', {name: "Prompt"}).click();

  // Validate default prompt value - Accept prompt with {your_name} and verify
  page.on('dialog', async (dialog) => {
    expect(dialog.type()).toContain('prompt')
    expect(dialog.message()).toContain('Please enter your name:');
    expect(dialog.defaultValue()).toContain('Harry Potter');
    await dialog.accept('Manh');
    await expect(page.locator('#demo')).toContainText('Hello Manh! How are you today?');
  });
});