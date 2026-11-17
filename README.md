# Demo Web Shop Automation Testing

## 1. Project Overview

This project is an automated testing project for the Demo Web Shop website using Playwright with JavaScript and the Page Object Model (POM) design pattern.

The main objective is to automate login, customer registration, product search, shopping cart, and checkout functionalities.

**Application URL:** https://demowebshop.tricentis.com/

## 2. Technologies Used

- JavaScript
- Node.js
- Playwright
- Page Object Model (POM)
- Postman
- Newman
- Allure Report
- Playwright HTML Report

## 3. Project Features

### Q1: Invalid Login Test
- Open the Demo Web Shop website.
- Navigate to the login page.
- Enter invalid login credentials.
- Verify the login error message.

### Q2: Customer Registration and Add to Cart
- Open the registration page.
- Enter customer information.
- Complete customer registration.
- Select a product.
- Add the product to the shopping cart.
- Verify the cart quantity.

### Q3: Product Search and Checkout
- Search for a product.
- Verify the search result.
- Open the product details page.
- Increase the product quantity.
- Add the product to the cart.
- Accept terms and conditions.
- Complete the checkout process.
- Verify the order confirmation and order number.

## 4. Project Structure

```text
DemoWebShop_Automation/
│
├── pages/
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── HomePage.js
│   ├── ProductPage.js
│   ├── SearchPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── OrderPage.js
│
├── tests/
│   ├── q1-invalid-login.spec.js
│   ├── q2-register-cart.spec.js
│   └── q3-search-checkout.spec.js
│
├── utils/
│   └── testData.js
│
├── scripts/
│   └── run-tests.js
│
├── screenshots/
│
├── api-tests/
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

## 5. Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project directory:

```bash
cd DemoWebShop_Automation
```

Install dependencies:

```bash
npm install
```

## 6. Run Tests

Run all tests:

```bash
npx playwright test
```

Run Q1:

```bash
npm run test:q1
```

Run Q2:

```bash
npm run test:q2
```

Run Q3:

```bash
npm run test:q3
```

## 7. Playwright HTML Report

Show the HTML report:

```bash
npx playwright show-report
```

## 8. Allure Report

Generate the Allure report:

```bash
npx allure generate allure-results --clean -o allure-report
```

Open the report:

```bash
npx allure open allure-report
```

## 9. Screenshots

Project screenshots are available in the `screenshots/` directory.

## 10. API Testing

API testing will be performed using Postman and Newman with the JSONPlaceholder API.

## 11. Test Execution Status

- Q1: Invalid Login Test — Passed
- Q2: Registration and Add to Cart — Passed
- Q3: Search and Checkout — Passed

## 12. Author

Demo Web Shop Automation Testing Project