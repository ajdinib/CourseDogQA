import { test, expect } from '@playwright/test';

const BASE_URL = 'https://qa-practice.netlify.app/auth_ecommerce';
// credentials shown on the login page
const TEST_USER = { email: 'admin@admin.com', password: 'admin123' };

// helper to login using placeholders/labels
async function login(page) {
  await page.goto(BASE_URL);
  await page.fill('input[placeholder*="email"]', TEST_USER.email);
  await page.fill('input[placeholder*="Password"]', TEST_USER.password);
  await page.click('button:has-text("Submit")');
  // after login the shopping cart should be visible
  await expect(page.locator('text=SHOPPING CART')).toBeVisible();
}

test.describe('E-commerce Auth & Order Flow', () => {
  test('happy path: login, add items, order, logout', async ({ page }) => {
    await login(page);

    // add the first two available products by button text
    const products = page.locator('button:has-text("ADD TO CART")');
    // at least two products should be available
    const count = await products.count();
    expect(count).toBeGreaterThan(1);
    await products.nth(0).click();
    await products.nth(1).click();

    // proceed to checkout using visible button
    await page.click('button:has-text("PROCEED TO CHECKOUT")');

    // fill shipping details
    await page.fill('input[placeholder="Enter phone number"]', '1234567890');
    await page.fill('input[placeholder="5876 Little Streets"]', '123 Main St');
    await page.fill('input[placeholder="London"]', 'Anytown');
    await page.selectOption('#countries_dropdown_menu', 'United States of America');

    await page.click('button:has-text("Submit Order")');
    await expect(page.locator('text=Congrats!')).toBeVisible();

    // logout by clicking the logout link in the navigation
    await page.click('a#logout');
  });

  test('invalid login shows error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('input[placeholder*="email"]', 'wrong@user.com');
    await page.fill('input[placeholder*="Password"]', 'badpass');
    await page.click('button:has-text("Submit")');
    // The app still shows login form; you could assert that shopping cart is not visible
    await expect(page.locator('text=SHOPPING CART')).not.toBeVisible();
  });
});
