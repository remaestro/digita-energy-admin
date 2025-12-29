import { test, expect } from '@playwright/test';
import { LoginPage, RegisterPage, DashboardPage } from '../page-objects/pages';
import { TestData, StorageHelper } from '../utils/helpers';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await StorageHelper.clearStorage(page);
  });

  test('should display login page correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(page).toHaveTitle(/login|sign in/i);
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.signUpLink).toBeVisible();
  });

  test('should display register page correctly', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();

    await expect(page).toHaveTitle(/register|sign up/i);
    await expect(registerPage.nameInput).toBeVisible();
    await expect(registerPage.emailInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
  });

  test('should navigate from login to register', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.goToSignUp();

    await expect(page).toHaveURL(/\/register/);
  });

  test('should navigate from register to login', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.goToLogin();

    await expect(page).toHaveURL(/\/login/);
  });

  test('should register a new user successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const name = TestData.randomName();
    const email = TestData.randomEmail();
    const password = TestData.randomPassword();

    await registerPage.goto();
    await registerPage.register(name, email, password);

    // Should redirect to dashboard after successful registration
    await expect(page).toHaveURL('/', { timeout: 10000 });
    
    // Dashboard should be visible
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });

  test('should show error for invalid registration (duplicate email)', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const name = TestData.randomName();
    const email = 'duplicate@example.com';
    const password = TestData.randomPassword();

    // Register first time
    await registerPage.goto();
    await registerPage.register(name, email, password);
    await page.waitForURL('/', { timeout: 10000 });

    // Logout
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.logout();

    // Try to register again with same email
    await registerPage.goto();
    await registerPage.register(name, email, password);

    // Should show error
    await expect(registerPage.errorMessage).toBeVisible({ timeout: 5000 });
  });

  test('should login with valid credentials', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const name = TestData.randomName();
    const email = TestData.randomEmail();
    const password = TestData.randomPassword();

    // First register a user
    await registerPage.goto();
    await registerPage.register(name, email, password);
    await page.waitForURL('/');

    // Logout
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.logout();
    await page.waitForURL('/login');

    // Now login
    await loginPage.login(email, password);

    // Should redirect to dashboard
    await expect(page).toHaveURL('/', { timeout: 10000 });
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });

  test('should show error for invalid login credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('nonexistent@example.com', 'wrongpassword');

    // Should show error message
    await expect(loginPage.errorMessage).toBeVisible({ timeout: 5000 });
    
    // Should stay on login page
    await expect(page).toHaveURL(/\/login/);
  });

  test('should show error for empty form submission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    
    // Try to submit empty form
    await loginPage.loginButton.click();

    // Should show validation errors or stay on page
    await expect(page).toHaveURL(/\/login/);
  });

  test('should logout successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const dashboardPage = new DashboardPage(page);

    // Register and login
    const name = TestData.randomName();
    const email = TestData.randomEmail();
    const password = TestData.randomPassword();

    await registerPage.goto();
    await registerPage.register(name, email, password);
    await page.waitForURL('/');

    // Logout
    await dashboardPage.logout();

    // Should redirect to login page
    await expect(page).toHaveURL('/login', { timeout: 5000 });
    
    // Token should be cleared
    const token = await StorageHelper.getAuthToken(page);
    expect(token).toBeNull();
  });

  test('should protect dashboard route when not authenticated', async ({ page }) => {
    await page.goto('/');

    // Should redirect to login
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('should protect projects route when not authenticated', async ({ page }) => {
    await page.goto('/projects');

    // Should redirect to login
    await expect(page).toHaveURL('/login', { timeout: 5000 });
  });

  test('should persist authentication after page reload', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const dashboardPage = new DashboardPage(page);

    // Register
    const name = TestData.randomName();
    const email = TestData.randomEmail();
    const password = TestData.randomPassword();

    await registerPage.goto();
    await registerPage.register(name, email, password);
    await page.waitForURL('/');

    // Reload page
    await page.reload();

    // Should still be authenticated
    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(page).toHaveURL('/');
  });
});
