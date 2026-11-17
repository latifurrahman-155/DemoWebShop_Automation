
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Q1 - Invalid Login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.login(
    'invaliduser123@example.com',
    'WrongPassword123'
  );

  await expect(loginPage.errorMessage).toBeVisible();

  await expect(page).not.toHaveURL(/\/customer\/info/);

  await expect(
    page.locator('.header-links')
  ).not.toContainText('Log out');

});
