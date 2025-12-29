import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object Model
 * All page objects extend this class
 */
export class BasePage {
  constructor(protected page: Page) {}

  async goto(path: string = '') {
    await this.page.goto(path);
  }

  async waitForURL(url: string) {
    await this.page.waitForURL(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `tests/screenshots/${name}.png` });
  }
}

/**
 * Login Page Object Model
 */
export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly signUpLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: /sign in|login/i });
    this.signUpLink = page.getByRole('link', { name: /sign up|register/i });
    this.errorMessage = page.locator('[role="alert"]');
  }

  async goto() {
    await super.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async goToSignUp() {
    await this.signUpLink.click();
  }

  async hasError(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}

/**
 * Register Page Object Model
 */
export class RegisterPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly loginLink: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByPlaceholder(/name/i);
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.registerButton = page.getByRole('button', { name: /sign up|register|create account/i });
    this.loginLink = page.getByRole('link', { name: /sign in|login/i });
    this.errorMessage = page.locator('[role="alert"]');
  }

  async goto() {
    await super.goto('/register');
  }

  async register(name: string, email: string, password: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }

  async goToLogin() {
    await this.loginLink.click();
  }
}

/**
 * Dashboard Page Object Model
 */
export class DashboardPage extends BasePage {
  readonly welcomeMessage: Locator;
  readonly logoutButton: Locator;
  readonly projectsLink: Locator;
  readonly templatesLink: Locator;
  readonly createProjectButton: Locator;
  readonly statsCards: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeMessage = page.locator('h1, h2').first();
    this.logoutButton = page.getByRole('button', { name: /logout|sign out/i });
    this.projectsLink = page.getByRole('link', { name: /projects/i });
    this.templatesLink = page.getByRole('link', { name: /templates/i });
    this.createProjectButton = page.getByRole('button', { name: /create project|new project/i });
    this.statsCards = page.locator('[class*="card"]');
  }

  async goto() {
    await super.goto('/');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async goToProjects() {
    await this.projectsLink.click();
  }

  async goToTemplates() {
    await this.templatesLink.click();
  }

  async createProject() {
    await this.createProjectButton.click();
  }

  async getStatsCount(): Promise<number> {
    return this.statsCards.count();
  }
}

/**
 * Projects Page Object Model
 */
export class ProjectsPage extends BasePage {
  readonly createButton: Locator;
  readonly projectCards: Locator;
  readonly searchInput: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    super(page);
    this.createButton = page.getByRole('button', { name: /create|new project/i });
    this.projectCards = page.locator('[data-testid="project-card"], [class*="project"]');
    this.searchInput = page.getByPlaceholder(/search/i);
    this.emptyState = page.locator('text=/no projects/i');
  }

  async goto() {
    await super.goto('/projects');
  }

  async createNewProject() {
    await this.createButton.click();
  }

  async getProjectCount(): Promise<number> {
    return this.projectCards.count();
  }

  async clickProject(index: number) {
    await this.projectCards.nth(index).click();
  }

  async hasProjects(): Promise<boolean> {
    const count = await this.getProjectCount();
    return count > 0;
  }
}

/**
 * Create Project Page Object Model
 */
export class CreateProjectPage extends BasePage {
  readonly templateCards: Locator;
  readonly projectNameInput: Locator;
  readonly projectDescriptionInput: Locator;
  readonly nextButton: Locator;
  readonly backButton: Locator;
  readonly createButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    this.templateCards = page.locator('[data-testid="template-card"], button:has-text("Use Template")');
    this.projectNameInput = page.getByLabel(/project name/i);
    this.projectDescriptionInput = page.getByLabel(/description/i);
    this.nextButton = page.getByRole('button', { name: /next/i });
    this.backButton = page.getByRole('button', { name: /back/i });
    this.createButton = page.getByRole('button', { name: /create project/i });
    this.cancelButton = page.getByRole('button', { name: /cancel/i });
  }

  async goto() {
    await super.goto('/projects/new');
  }

  async selectTemplate(index: number) {
    await this.templateCards.nth(index).click();
  }

  async fillProjectDetails(name: string, description?: string) {
    await this.projectNameInput.fill(name);
    if (description) {
      await this.projectDescriptionInput.fill(description);
    }
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async submitProject() {
    await this.createButton.click();
  }

  async createProjectFlow(templateIndex: number, projectName: string, description?: string) {
    await this.selectTemplate(templateIndex);
    await this.clickNext();
    await this.fillProjectDetails(projectName, description);
    await this.submitProject();
  }
}

/**
 * Templates Page Object Model
 */
export class TemplatesPage extends BasePage {
  readonly templateCards: Locator;
  readonly useTemplateButtons: Locator;

  constructor(page: Page) {
    super(page);
    this.templateCards = page.locator('[data-testid="template-card"]');
    this.useTemplateButtons = page.getByRole('button', { name: /use template/i });
  }

  async goto() {
    await super.goto('/templates');
  }

  async getTemplateCount(): Promise<number> {
    return this.templateCards.count();
  }

  async useTemplate(index: number) {
    await this.useTemplateButtons.nth(index).click();
  }
}
