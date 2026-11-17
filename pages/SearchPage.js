
class SearchPage {
    constructor(page) {
        this.page = page;

        this.searchBox = page.locator('#small-searchterms');
        this.searchButton = page.locator(
            'input.button-1.search-box-button'
        );

        this.productResults = page.locator(
            '.product-item .product-title a'
        );
    }

    async searchProduct(productName) {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }

    async getFirstProductName() {
        return (
            await this.productResults.first().innerText()
        ).trim();
    }

    async openFirstProduct() {
        await this.productResults.first().click();
    }
}

module.exports = SearchPage;
