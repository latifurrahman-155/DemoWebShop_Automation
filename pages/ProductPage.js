
class ProductPage {
    constructor(page) {
        this.page = page;

        this.productTitle = page.locator('.product-name h1');

        this.quantity = page.locator('.qty-input');

        this.addToCartButton = page.locator(
            'input[id^="add-to-cart-button-"]'
        );
    }

    async verifyProductVisible() {
        await this.productTitle.waitFor({
            state: 'visible'
        });
    }

    async getProductName() {
        return (await this.productTitle.innerText()).trim();
    }

    async setQuantity(value) {
        await this.quantity.fill(String(value));
    }

    async addToCart() {
        await this.addToCartButton.click();
    }
}

module.exports = ProductPage;
