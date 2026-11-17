
const { test, expect } = require('@playwright/test');

const RegisterPage = require('../pages/RegisterPage');
const { generateUser } = require('../utils/testData');

test('Q2: Register new customer and add product to cart', async ({ page }) => {

    // Step 1: Generate unique customer
    const user = generateUser();

    // Step 2: Open Registration Page
    const registerPage = new RegisterPage(page);

    await page.goto('/register');

    // Step 3: Register new customer
    await registerPage.register(user);

    // Step 4: Verify registration successful
    await expect(page.locator('.result'))
        .toContainText(/Your registration completed/i);

    // Step 5: Verify customer is logged in
    await expect(
        page.getByRole('link', { name: 'Log out' })
    ).toBeVisible();

    // Step 6: Select Books category
    await page.locator('a[href="/books"]').first().click();

    // Step 7: Select first available product
    const firstProduct = page.locator(
        '.product-item .product-title a'
    ).first();

    await expect(firstProduct).toBeVisible();

    const productName = (await firstProduct.innerText()).trim();

    console.log('Selected Product:', productName);

    // Step 8: Open product
    await firstProduct.click();

    // Step 9: Add product to cart
    await page.locator(
        'input[id^="add-to-cart-button-"]'
    ).click();

    // Step 10: Verify product added notification
    await expect(page.locator('#bar-notification'))
        .toContainText(/added to your shopping cart/i);

    // Step 11: Open Shopping Cart
    await page.goto('/cart');

    // Step 12: Find product in cart
    const cartRow = page.locator('.cart-item-row').filter({
        hasText: productName
    });

    await expect(cartRow).toBeVisible();

    // Step 13: Verify product quantity
    await expect(cartRow.locator('.qty-input'))
        .toHaveValue('1');

    console.log('Product successfully added to cart!');
    console.log('Product Quantity: 1');

});
