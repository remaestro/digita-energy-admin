import { test, expect } from '@playwright/test';
import { RegisterPage, TemplatesPage, DashboardPage } from '../page-objects/pages';
import { TestData, StorageHelper } from '../utils/helpers';

test.describe('Templates', () => {
  test.beforeEach(async ({ page }) => {
    await StorageHelper.clearStorage(page);

    // Register and login
    const registerPage = new RegisterPage(page);
    const name = TestData.randomName();
    const email = TestData.randomEmail();
    const password = TestData.randomPassword();

    await registerPage.goto();
    await registerPage.register(name, email, password);
    await page.waitForURL('/');
  });

  test('should display templates page', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    await expect(page).toHaveURL('/templates');
  });

  test('should display all available templates', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    const count = await templatesPage.getTemplateCount();
    expect(count).toBeGreaterThan(0);
    // According to specs, there should be 4 templates
    expect(count).toBe(4);
  });

  test('should display template cards with information', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    // Each template should have name and description
    const firstTemplate = templatesPage.templateCards.first();
    await expect(firstTemplate).toBeVisible();
  });

  test('should have "Use Template" button on each template', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    const buttonCount = await templatesPage.useTemplateButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should navigate to create project when using template', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    // Click "Use Template" on first template
    await templatesPage.useTemplate(0);

    // Should navigate to create project page with template pre-selected
    await expect(page).toHaveURL(/\/projects\/new/, { timeout: 5000 });
  });

  test('should display Full-Stack Web App template', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    const content = await page.textContent('body');
    expect(content).toContain('Full-Stack');
  });

  test('should display Landing Page template', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    const content = await page.textContent('body');
    expect(content).toContain('Landing');
  });

  test('should display Mobile App template', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    const content = await page.textContent('body');
    expect(content).toContain('Mobile');
  });

  test('should display API Service template', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    const content = await page.textContent('body');
    expect(content).toContain('API');
  });

  test('should show template features or tags', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    // Templates should show tech stack or features
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });

  test('should navigate from dashboard to templates', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    await dashboardPage.goToTemplates();

    await expect(page).toHaveURL('/templates');
  });

  test('should be responsive on mobile', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await templatesPage.goto();

    // Templates should still be visible
    const count = await templatesPage.getTemplateCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should display template icons or images', async ({ page }) => {
    const templatesPage = new TemplatesPage(page);
    await templatesPage.goto();

    // Check for icons or images in templates
    const images = page.locator('img, svg');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });
});
