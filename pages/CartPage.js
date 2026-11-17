
class CartPage {
    constructor(page) {
        this.page = page;

        this.cartRows = page.locator('.cart-item-row');

        this.termsCheckbox = page.locator('#termsofservice');

        this.checkoutButton = page.locator('#checkout');
    }

    async openCart() {
        await this.page.goto('/cart');
    }

    async getProductRow(productName) {
        const row = this.cartRows.filter({
            hasText: productName
        });

        await row.waitFor({
            state: 'visible'
        });

        return row;
    }

    async getProductQuantity(productName) {
        const row = await this.getProductRow(productName);

        return await row.locator('.qty-input').inputValue();
    }

    async acceptTermsAndCheckout() {
        await this.termsCheckbox.check();

        await this.checkoutButton.click();
    }
}

module.exports = CartPage;
