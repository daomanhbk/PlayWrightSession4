import { test, expect } from '@playwright/test';

test('test prompt dialog', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://testautomationpractice.blogspot.com/');

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

