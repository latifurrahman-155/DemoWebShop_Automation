
class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Guest Checkout
        this.checkoutAsGuestButton = page.locator(
            'input.button-1.checkout-as-guest-button'
        );

        // Checkout Continue Buttons
        this.billingContinue = page.locator(
            '#billing-buttons-container input.button-1'
        );

        this.shippingContinue = page.locator(
            '#shipping-buttons-container input.button-1'
        );

        this.shippingMethodContinue = page.locator(
            '#shipping-method-buttons-container input.button-1'
        );

        this.paymentMethodContinue = page.locator(
            '#payment-method-buttons-container input.button-1'
        );

        this.paymentInfoContinue = page.locator(
            '#payment-info-buttons-container input.button-1'
        );

        this.confirmOrderButton = page.locator(
            '#confirm-order-buttons-container input.button-1'
        );
    }

    // Step 1: Checkout as Guest
    async checkoutAsGuest() {
        if (await this.checkoutAsGuestButton.count()) {
            await this.checkoutAsGuestButton.click();
        }
    }

    // Step 2: Fill Address
    async fillAddress(prefix, data) {
        const fields = [
            { label: 'First name:', value: data.firstName },
            { label: 'Last name:', value: data.lastName },
            { label: 'Email:', value: data.email },
            { label: 'City:', value: data.city },
            { label: 'Address 1:', value: data.address },
            { label: 'Zip / postal code:', value: data.zip },
            { label: 'Phone number:', value: data.phone }
        ];

        for (const field of fields) {
            if (
                field.value === undefined ||
                field.value === null ||
                field.value === ''
            ) {
                throw new Error(
                    `Missing checkout data: ${field.label}`
                );
            }

            const locator = this.page.getByLabel(
                field.label,
                { exact: true }
            );

            await locator.fill(String(field.value));

            console.log(`${field.label} filled successfully`);
        }

        // Select Country
        const country = this.page.getByLabel(
            'Country:',
            { exact: true }
        );

        await country.selectOption({
            label: data.country
        });

        console.log('Country selected:', data.country);

        // Select State / Province if available
        const state = this.page.getByLabel(
            'State / province:',
            { exact: true }
        );

        if (await state.count()) {
            const options = await state.locator('option').count();

            if (options > 1) {
                await state.selectOption({ index: 1 });
            }
        }
    }

    // Step 3: Complete Billing
    async completeBilling(data) {
        console.log('Checkout Data:', data);

        await this.fillAddress('BillingNewAddress', data);

        await this.billingContinue.waitFor({
            state: 'visible'
        });

        await this.billingContinue.click();

        console.log('Billing address submitted.');
    }

    // Step 4: Complete Shipping
    async completeShipping(data) {
        const shippingAddress = this.page.locator(
            '#shipping-address-select'
        );

        if (await shippingAddress.count()) {
            const addressCount = await shippingAddress.locator(
                'option'
            ).count();

            if (addressCount > 1) {
                await shippingAddress.selectOption({ index: 1 });
            }
        }

        await this.shippingContinue.waitFor({
            state: 'visible'
        });

        await this.shippingContinue.click();

        console.log('Shipping step completed.');
    }

    // Step 5: Complete Shipping Method
    async completeShippingMethod() {
        const options = this.page.locator(
            'input[name="shippingoption"]'
        );

        if (await options.count()) {
            await options.first().check();
        }

        await this.shippingMethodContinue.waitFor({
            state: 'visible'
        });

        await this.shippingMethodContinue.click();

        console.log('Shipping method completed.');
    }

    // Step 6: Complete Payment Method
    async completePaymentMethod() {
        const options = this.page.locator(
            'input[name="paymentmethod"]'
        );

        if (await options.count()) {
            await options.first().check();
        }

        await this.paymentMethodContinue.waitFor({
            state: 'visible'
        });

        await this.paymentMethodContinue.click();

        console.log('Payment method completed.');
    }

    // Step 7: Complete Payment Information
    async completePaymentInfo() {
        await this.paymentInfoContinue.waitFor({
            state: 'visible'
        });

        await this.paymentInfoContinue.click();

        console.log('Payment information completed.');
    }

    // Step 8: Confirm Order
    async confirmOrder() {
        await this.confirmOrderButton.waitFor({
            state: 'visible'
        });

        await this.confirmOrderButton.click();

        console.log('Confirm Order button clicked.');
    }
}

module.exports = CheckoutPage;
