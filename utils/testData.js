
// Generate Unique User Data
function generateUser() {
    const timestamp = Date.now();

    return {
        firstName: 'Test',
        lastName: 'User',
        email: `testuser${timestamp}@example.com`,
        password: 'Test@12345'
    };
}

// Checkout Test Data
const checkoutData = {
    firstName: 'Test',
    lastName: 'Customer',
    email: 'checkout.test@example.com',
    country: 'Bangladesh',
    city: 'Dhaka',
    address: 'Mirpur Road',
    zip: '1207',
    phone: '01700000000'
};

// Export Test Data
module.exports = {
    generateUser,
    checkoutData
};
