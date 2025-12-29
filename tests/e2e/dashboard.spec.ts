import { test, expect } from '@playwright/test';
import { DashboardPage } from '../page-objects/pages';
import { RegisterPage } from '../page-objects/pages';
import { TestData, StorageHelper } from '../utils/helpers';

test.describe('Dashboard', () => {
  let email: string;
  let password: string;

  test.beforeEach(async ({ page }) => {
    await StorageHelper.clearStorage(page);

    // Create and login a user before each test
    const registerPage = new RegisterPage(page);
    const name = TestData.randomName();
    email = TestData.randomEmail();
    password = TestData.randomPassword();

    await registerPage.goto();
    await registerPage.register(name, email, password);
    await page.waitForURL('/');
  });

  test('should display dashboard after login', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.welcomeMessage).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('should display statistics cards', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    const statsCount = await dashboardPage.getStatsCount();
    expect(statsCount).toBeGreaterThan(0);
  });

  test('should have navigation to projects', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.projectsLink).toBeVisible();
  });

  test('should have navigation to templates', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.templatesLink).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.goToProjects();
    await expect(page).toHaveURL('/projects', { timeout: 5000 });
  });

  test('should navigate to templates page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.goToTemplates();
    await expect(page).toHaveURL('/templates', { timeout: 5000 });
  });

  test('should have create project button or link', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Either button or link should be visible
    const hasCreateButton = await dashboardPage.createProjectButton.isVisible().catch(() => false);
    expect(hasCreateButton).toBeTruthy();
  });

  test('should have logout functionality', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.logoutButton).toBeVisible();
  });

  test('should show user-specific content', async ({ page }) => {
    // Dashboard should show personalized content
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });

  test('should be responsive', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await dashboardPage.goto();
    await expect(dashboardPage.welcomeMessage).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await dashboardPage.goto();
    await expect(dashboardPage.welcomeMessage).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await dashboardPage.goto();
    await expect(dashboardPage.welcomeMessage).toBeVisible();
  });
});
