
const { test, expect } = require('@playwright/test');

const SearchPage = require('../pages/SearchPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const OrderPage = require('../pages/OrderPage');

const { checkoutData } = require('../utils/testData');

// Increase timeout to 90 seconds
test.setTimeout(90000);

test('Q3: Search product and complete checkout', async ({ page }) => {

    // Step 1: Open Website
    await page.goto('/');

    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderPage = new OrderPage(page);

    // Step 2: Search Product
    await searchPage.searchProduct('Computing and Internet');

    // Step 3: Verify Search Result
    await expect(searchPage.productResults.first()).toBeVisible();

    const productName = await searchPage.getFirstProductName();

    console.log('Product Found:', productName);

    // Step 4: Open Product
    await searchPage.openFirstProduct();

    await productPage.verifyProductVisible();

    await expect(productPage.productTitle)
        .toContainText(productName);

    // Step 5: Increase Quantity
    await productPage.setQuantity(2);

    // Step 6: Add to Cart
    await productPage.addToCart();

    await expect(page.locator('#bar-notification'))
        .toContainText(/added to your shopping cart/i);

    // Step 7: Open Cart
    await cartPage.openCart();

    // Step 8: Verify Product in Cart
    await cartPage.getProductRow(productName);

    // Step 9: Verify Quantity
    const quantity = await cartPage.getProductQuantity(productName);

    expect(quantity).toBe('2');

    console.log('Cart Quantity:', quantity);

    // Step 10: Accept Terms and Checkout
    await cartPage.acceptTermsAndCheckout();

    // Step 11: Guest Checkout
    await checkoutPage.checkoutAsGuest();

    // Step 12: Complete Billing
    await checkoutPage.completeBilling(checkoutData);

    // Step 13: Complete Shipping
    await checkoutPage.completeShipping(checkoutData);

    // Step 14: Complete Shipping Method
    await checkoutPage.completeShippingMethod();

    // Step 15: Complete Payment Method
    await checkoutPage.completePaymentMethod();

    // Step 16: Complete Payment Information
    await checkoutPage.completePaymentInfo();

    // Step 17: Confirm Order
    await checkoutPage.confirmOrder();

    console.log('Confirm Order button clicked.');

    // Step 18: Wait for Order Confirmation
    await orderPage.verifyOrderCompleted();

    // Step 19: Debug Current Page
    console.log('Current URL:', page.url());

    console.log(
        'Current Page Title:',
        await page.title()
    );

    // Step 20: Verify Confirmation Message
    await expect(orderPage.orderCompletedTitle)
        .toBeVisible();

    // Step 21: Get Order Number
    const orderNumber = await orderPage.getOrderNumber();

    console.log('Order Number:', orderNumber);

    console.log('Order successfully completed!');
});
