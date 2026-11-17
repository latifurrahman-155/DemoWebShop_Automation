
const { expect } = require('@playwright/test');

class OrderPage {
    constructor(page) {
        this.page = page;

        this.orderCompletedTitle = page.getByText(
            'Your order has been successfully processed!',
            { exact: true }
        );
    }

    // Step 1: Verify Order Completed
    async verifyOrderCompleted() {
        await expect(this.orderCompletedTitle).toBeVisible({
            timeout: 60000
        });

        console.log('Order confirmation verified.');
    }

    // Step 2: Get Order Number
    async getOrderNumber() {

        // Wait for confirmation
        await this.verifyOrderCompleted();

        // Get complete page text
        const pageText = await this.page.locator('body').innerText();

        console.log('Searching Order Number...');

        // Find order number from page text
        const match = pageText.match(
            /Order\s*(?:number|#)\s*:\s*([A-Z0-9-]+)/i
        );

        if (match) {
            console.log('Order Number Found:', match[1]);
            return match[1];
        }

        // Try common order number selectors
        const selectors = [
            '.order-number strong',
            '.order-number',
            '.order-overview .order-number',
            '.section.order-completed strong'
        ];

        for (const selector of selectors) {
            const locator = this.page.locator(selector).first();

            if (await locator.count()) {
                const text = (await locator.innerText()).trim();

                const numberMatch = text.match(
                    /(?:Order\s*(?:number|#)\s*:?\s*)?([A-Z0-9-]+)/i
                );

                if (numberMatch) {
                    console.log('Order Number Found:', numberMatch[1]);
                    return numberMatch[1];
                }
            }
        }

        // Show diagnostic information
        throw new Error(
            'Order confirmation is visible, but Order Number was not found. ' +
            'Current URL: ' + this.page.url() +
            '\nPage Text:\n' + pageText.slice(0, 3000)
        );
    }
}

module.exports = OrderPage;
