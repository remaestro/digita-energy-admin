import { test as base } from '@playwright/test';
import { 
  LoginPage, 
  RegisterPage, 
  DashboardPage, 
  ProjectsPage,
  CreateProjectPage,
  TemplatesPage 
} from '../page-objects/pages';
import { ApiHelper, TestData, StorageHelper } from '../utils/helpers';

/**
 * Extended test fixtures with page objects and utilities
 */
type TestFixtures = {
  loginPage: LoginPage;
  registerPage: RegisterPage;
  dashboardPage: DashboardPage;
  projectsPage: ProjectsPage;
  createProjectPage: CreateProjectPage;
  templatesPage: TemplatesPage;
  apiHelper: ApiHelper;
  authenticatedPage: any;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  projectsPage: async ({ page }, use) => {
    await use(new ProjectsPage(page));
  },

  createProjectPage: async ({ page }, use) => {
    await use(new CreateProjectPage(page));
  },

  templatesPage: async ({ page }, use) => {
    await use(new TemplatesPage(page));
  },

  apiHelper: async ({}, use) => {
    await use(new ApiHelper());
  },

  // Auto-authenticated page fixture
  authenticatedPage: async ({ page }, use) => {
    await StorageHelper.clearStorage(page);

    // Register and login automatically
    const registerPage = new RegisterPage(page);
    const name = TestData.randomName();
    const email = TestData.randomEmail();
    const password = TestData.randomPassword();

    await registerPage.goto();
    await registerPage.register(name, email, password);
    await page.waitForURL('/', { timeout: 10000 });

    await use({ page, email, password });
  },
});

export { expect } from '@playwright/test';
