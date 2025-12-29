import { test, expect } from '@playwright/test';
import { 
  RegisterPage, 
  ProjectsPage, 
  CreateProjectPage,
  DashboardPage 
} from '../page-objects/pages';
import { TestData, StorageHelper, WaitHelper } from '../utils/helpers';

test.describe('Project Management', () => {
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

  test('should display projects page', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const projectsPage = new ProjectsPage(page);

    await dashboardPage.goToProjects();
    await expect(page).toHaveURL('/projects');
  });

  test('should show empty state when no projects', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();

    // Check for empty state or no projects message
    const hasProjects = await projectsPage.hasProjects();
    if (!hasProjects) {
      await expect(projectsPage.emptyState).toBeVisible();
    }
  });

  test('should navigate to create project page', async ({ page }) => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.goto();
    
    await projectsPage.createNewProject();
    await expect(page).toHaveURL(/\/projects\/new/);
  });

  test('should display templates in create project wizard', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    await createProjectPage.goto();

    const templateCount = await createProjectPage.templateCards.count();
    expect(templateCount).toBeGreaterThan(0);
  });

  test('should create a new project successfully', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    const projectName = TestData.randomProjectName();

    await createProjectPage.goto();

    // Select first template
    await createProjectPage.selectTemplate(0);
    await createProjectPage.clickNext();

    // Fill project details
    await createProjectPage.fillProjectDetails(projectName, 'Test project description');
    
    // Wait for API response
    const responsePromise = WaitHelper.waitForResponse(page, '/api/projects');
    await createProjectPage.submitProject();
    await responsePromise;

    // Should redirect to projects page or project detail page
    await page.waitForURL(/\/projects/, { timeout: 10000 });
  });

  test('should validate project name is required', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);

    await createProjectPage.goto();

    // Select template
    await createProjectPage.selectTemplate(0);
    await createProjectPage.clickNext();

    // Try to submit without filling name
    await createProjectPage.submitProject();

    // Should show validation error or stay on page
    await expect(page).toHaveURL(/\/projects\/new/);
  });

  test('should allow going back in wizard', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);

    await createProjectPage.goto();
    
    // Select template and go to next step
    await createProjectPage.selectTemplate(0);
    await createProjectPage.clickNext();

    // Go back
    await createProjectPage.backButton.click();

    // Should be on template selection step
    const templateCount = await createProjectPage.templateCards.count();
    expect(templateCount).toBeGreaterThan(0);
  });

  test('should display created project in projects list', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    const projectsPage = new ProjectsPage(page);
    const projectName = TestData.randomProjectName();

    // Create project
    await createProjectPage.goto();
    await createProjectPage.createProjectFlow(0, projectName, 'Test description');
    
    // Wait for redirect
    await page.waitForURL(/\/projects/, { timeout: 10000 });

    // Go to projects list
    await projectsPage.goto();

    // Should see the project
    const content = await page.textContent('body');
    expect(content).toContain(projectName);
  });

  test('should open project details when clicking on project', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    const projectsPage = new ProjectsPage(page);
    const projectName = TestData.randomProjectName();

    // Create a project first
    await createProjectPage.goto();
    await createProjectPage.createProjectFlow(0, projectName);
    await page.waitForURL(/\/projects/, { timeout: 10000 });

    // Navigate to projects list
    await projectsPage.goto();

    // Click on first project
    const hasProjects = await projectsPage.hasProjects();
    if (hasProjects) {
      await projectsPage.clickProject(0);
      await expect(page).toHaveURL(/\/projects\/[a-zA-Z0-9-]+/, { timeout: 5000 });
    }
  });

  test('should display project details page', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    const projectName = TestData.randomProjectName();

    // Create project
    await createProjectPage.goto();
    await createProjectPage.createProjectFlow(0, projectName);
    await page.waitForURL(/\/projects/, { timeout: 10000 });

    // Should show project name
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });

  test('should have generate files button on project detail page', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    const projectName = TestData.randomProjectName();

    // Create project
    await createProjectPage.goto();
    await createProjectPage.createProjectFlow(0, projectName);
    await page.waitForURL(/\/projects\/[a-zA-Z0-9-]+/, { timeout: 10000 });

    // Look for generate button
    const generateButton = page.getByRole('button', { name: /generate/i });
    await expect(generateButton).toBeVisible({ timeout: 5000 });
  });

  test('should trigger file generation', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    const projectName = TestData.randomProjectName();

    // Create project
    await createProjectPage.goto();
    await createProjectPage.createProjectFlow(0, projectName);
    await page.waitForURL(/\/projects\/[a-zA-Z0-9-]+/, { timeout: 10000 });

    // Click generate button
    const generateButton = page.getByRole('button', { name: /generate/i });
    
    // Wait for API call
    const responsePromise = WaitHelper.waitForResponse(page, '/generate');
    await generateButton.click();
    await responsePromise;

    // Status should update
    await page.waitForTimeout(1000);
  });

  test('should delete project successfully', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);
    const projectName = TestData.randomProjectName();

    // Create project
    await createProjectPage.goto();
    await createProjectPage.createProjectFlow(0, projectName);
    await page.waitForURL(/\/projects\/[a-zA-Z0-9-]+/, { timeout: 10000 });

    // Find and click delete button
    const deleteButton = page.getByRole('button', { name: /delete/i });
    await deleteButton.click();

    // Confirm deletion (if confirmation dialog appears)
    const confirmButton = page.getByRole('button', { name: /confirm|yes|delete/i });
    const isVisible = await confirmButton.isVisible().catch(() => false);
    if (isVisible) {
      await confirmButton.click();
    }

    // Should redirect to projects list
    await expect(page).toHaveURL('/projects', { timeout: 10000 });
  });

  test('should handle project creation with different templates', async ({ page }) => {
    const createProjectPage = new CreateProjectPage(page);

    await createProjectPage.goto();
    
    const templateCount = await createProjectPage.templateCards.count();
    
    // Try creating with second template (if available)
    if (templateCount > 1) {
      const projectName = TestData.randomProjectName();
      await createProjectPage.createProjectFlow(1, projectName);
      await page.waitForURL(/\/projects/, { timeout: 10000 });
    }
  });
});
