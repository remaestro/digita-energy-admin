import { Page } from '@playwright/test';

/**
 * Test data generator utilities
 */
export class TestData {
  static randomEmail(): string {
    return `test-${Date.now()}-${Math.random().toString(36).substring(7)}@example.com`;
  }

  static randomPassword(): string {
    return `Pass${Math.random().toString(36).substring(2)}123!`;
  }

  static randomName(): string {
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];
    return names[Math.floor(Math.random() * names.length)];
  }

  static randomProjectName(): string {
    const prefixes = ['Awesome', 'Cool', 'Super', 'Mega'];
    const suffixes = ['App', 'Project', 'Platform', 'System'];
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}-${suffixes[Math.floor(Math.random() * suffixes.length)]}-${Date.now()}`;
  }
}

/**
 * Wait utilities
 */
export class WaitHelper {
  static async waitForResponse(page: Page, urlPattern: string | RegExp, timeout = 30000) {
    return page.waitForResponse(
      (response) => {
        const url = response.url();
        if (typeof urlPattern === 'string') {
          return url.includes(urlPattern);
        }
        return urlPattern.test(url);
      },
      { timeout }
    );
  }

  static async waitForNavigation(page: Page, url: string, timeout = 30000) {
    return page.waitForURL(url, { timeout });
  }
}

/**
 * API utilities for test setup
 */
export class ApiHelper {
  constructor(private baseURL: string = 'http://localhost:3001/api') {}

  async createUser(email: string, password: string, name: string) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    return response.json();
  }

  async login(email: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  async getTemplates(token?: string) {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${this.baseURL}/templates`, { headers });
    return response.json();
  }

  async deleteProject(projectId: string, token: string) {
    const response = await fetch(`${this.baseURL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  }
}

/**
 * Storage utilities
 */
export class StorageHelper {
  static async setAuthToken(page: Page, token: string) {
    await page.evaluate((token) => {
      localStorage.setItem('token', token);
    }, token);
  }

  static async getAuthToken(page: Page): Promise<string | null> {
    return page.evaluate(() => localStorage.getItem('token'));
  }

  static async clearStorage(page: Page) {
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }
}
