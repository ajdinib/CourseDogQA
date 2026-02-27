import { test, expect } from '@playwright/test';
import path from 'path';

const BASE_URL = 'https://qa-practice.netlify.app/file-upload';

test.describe('File upload page', () => {
  test('happy path: upload a file', async ({ page }) => {
    await page.goto(BASE_URL);
    const filePath = path.resolve(__dirname, '../fixtures/sample.txt');
    await page.setInputFiles('#file_upload', filePath);
    await page.click('button:has-text("Submit")');
    await expect(page.locator('text=You have successfully uploaded')).toContainText('sample.txt');
  });

  test('submit without selecting file still shows message', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('button:has-text("Submit")');
    await expect(page.locator('text=You have successfully uploaded ""')).toBeVisible();
  });});
