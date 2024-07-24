import { test, expect } from '@playwright/test';

test('TC001 - Verify sort by price', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="title"]')).toContainText('Products');

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const priceElements = await page.$$('[data-test="inventory-item-price"]');
  const prices = await Promise.all(priceElements.map(async (element) => {
    return await element.innerText();
  }));
  
  expect(prices.length).toEqual(6);
  expect(isSorted(prices)).toBe(true);
});

test('TC002 - Verify user can order product', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/inventory.html');
  await expect(page.locator('[data-test="title"]')).toContainText('Products');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');  
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

  const itemName = await page.locator('(//div[@data-test="inventory-item-name"])[1]').innerText();
  const itemDescription = await page.locator('(//div[@data-test="inventory-item-desc"])[1]').innerText();
  const itemPrice = await page.locator('(//div[@data-test="inventory-item-price"])[1]').innerText();

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(itemName);
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText(itemDescription);
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText(itemPrice);

  const firstName = 'FN';
  const lastName = 'LN';
  const zipCode = '12345';

  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill(firstName);
  await page.locator('[data-test="lastName"]').fill(lastName);
  await page.locator('[data-test="postalCode"]').fill(zipCode);
  await expect(page.locator('[data-test="firstName"]')).toHaveValue(firstName);
  await expect(page.locator('[data-test="lastName"]')).toHaveValue(lastName);
  await expect(page.locator('[data-test="postalCode"]')).toHaveValue(zipCode);
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Overview');
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(itemName);
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText(itemDescription);
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText(itemPrice);
  await page.locator('[data-test="finish"]').click();
  
  await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
  await expect(page.locator('[data-test="complete-text"]')).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

function isSorted(arr : any) {
  let isSorted = true;

  arr.every((currentValue : any, index : any) => {
    if (index === 0) {
      return true; // First element, always consider it as sorted
    } else {
      const currentPrice = parseFloat(arr[index].replace('$', ''));
      const nextPrice = parseFloat(arr[index - 1].replace('$', ''));
      if (currentPrice < nextPrice) {
        isSorted = false;
        return false; // Stop iterating
      }
      return true; // Continue iterating
    }
  });

  return isSorted;
}
