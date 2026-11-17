
class HomePage {
    constructor(page) {
        this.page = page;

        this.logo = page.locator(
            '.header-logo'
        );

        this.searchBox = page.locator(
            '#small-searchterms'
        );

        this.searchButton = page.locator(
            'input.button-1.search-box-button'
        );

        this.cartLink = page.locator(
            '.ico-cart'
        );

        this.loginLink = page.locator(
            '.ico-login'
        );

        this.registerLink = page.locator(
            '.ico-register'
        );

        this.booksCategory = page.getByRole(
            'link',
            { name: 'Books', exact: true }
        );

        this.computersCategory = page.getByRole(
            'link',
            { name: 'Computers', exact: true }
        );
    }

    async goto() {
        await this.page.goto('/');
    }

    async searchProduct(productName) {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
    }

    async openCart() {
        await this.cartLink.click();
    }

    async openLogin() {
        await this.loginLink.click();
    }

    async openRegister() {
        await this.registerLink.click();
    }

    async openBooksCategory() {
        await this.booksCategory.click();
    }

    async openComputersCategory() {
        await this.computersCategory.click();
    }
}

module.exports = { HomePage };
