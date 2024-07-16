import { test, expect } from '@playwright/test';

test('test Upload file', async ({ page }) => {
    // Navigate the the page    
  await page.goto('https://the-internet.herokuapp.com/');

  // Verify 'Welcome to the-internet' title is displayed
  await expect(page.locator('h1')).toContainText('Welcome to the-internet');

  // Select 'File Upload' link
  await page.getByRole('link', { name: 'File Upload' }).click();

  // Verify 'File Uploader' header title is displayed
  await expect(page.getByRole('heading')).toContainText('File Uploader');

  // Click on File Upload
  await page.locator('#file-upload').click();

  // Select the file
  await page.locator('#file-upload').setInputFiles('TC005_UploadFile.txt');

  // Click on the Upload button
  await page.getByRole('button', { name: 'Upload' }).click();

  // Verify the file is uploaded
  await expect(page.locator('#uploaded-files')).toContainText('TC005_UploadFile.txt');
});