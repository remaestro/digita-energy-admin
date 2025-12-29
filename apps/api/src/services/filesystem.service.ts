import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface TemplateVariable {
  key: string;
  value: string;
}

export class FileSystemService {
  private readonly templatesDir: string;
  private readonly outputDir: string;

  constructor() {
    // Navigate from apps/api/src/services to root/templates
    this.templatesDir = path.resolve(__dirname, '../../../../templates');
    // Output to a generated-projects directory
    this.outputDir = path.resolve(__dirname, '../../../../generated-projects');
  }

  /**
   * Check if template exists
   */
  async templateExists(templateId: string): Promise<boolean> {
    try {
      const templatePath = path.join(this.templatesDir, templateId);
      await fs.access(templatePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Copy template directory to output location
   */
  async copyTemplate(
    templateId: string,
    projectSlug: string
  ): Promise<string> {
    const sourcePath = path.join(this.templatesDir, templateId);
    const destPath = path.join(this.outputDir, projectSlug);

    // Ensure output directory exists
    await fs.mkdir(this.outputDir, { recursive: true });

    // Copy directory recursively
    await this.copyDirectoryRecursive(sourcePath, destPath);

    return destPath;
  }

  /**
   * Recursively copy directory
   */
  private async copyDirectoryRecursive(
    source: string,
    destination: string
  ): Promise<void> {
    await fs.mkdir(destination, { recursive: true });

    const entries = await fs.readdir(source, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(source, entry.name);
      const destPath = path.join(destination, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules, .git, dist, build directories
        if (['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
          continue;
        }
        await this.copyDirectoryRecursive(sourcePath, destPath);
      } else {
        await fs.copyFile(sourcePath, destPath);
      }
    }
  }

  /**
   * Substitute variables in all files
   */
  async substituteVariables(
    projectPath: string,
    variables: TemplateVariable[]
  ): Promise<void> {
    await this.processDirectory(projectPath, variables);
  }

  /**
   * Process all files in directory recursively
   */
  private async processDirectory(
    dirPath: string,
    variables: TemplateVariable[]
  ): Promise<void> {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Skip certain directories
        if (['node_modules', '.git', 'dist', 'build'].includes(entry.name)) {
          continue;
        }
        await this.processDirectory(fullPath, variables);
      } else {
        // Process file if it's a text file
        if (this.isTextFile(entry.name)) {
          await this.processFile(fullPath, variables);
        }
      }
    }
  }

  /**
   * Check if file is a text file that should be processed
   */
  private isTextFile(filename: string): boolean {
    const textExtensions = [
      '.js', '.jsx', '.ts', '.tsx', '.json', '.md', '.txt',
      '.html', '.css', '.scss', '.yaml', '.yml', '.toml',
      '.sh', '.env', '.example', '.prisma', '.sql'
    ];

    return textExtensions.some(ext => filename.endsWith(ext));
  }

  /**
   * Process single file - substitute variables
   */
  private async processFile(
    filePath: string,
    variables: TemplateVariable[]
  ): Promise<void> {
    try {
      let content = await fs.readFile(filePath, 'utf-8');

      // Replace all variables
      for (const variable of variables) {
        const regex = new RegExp(this.escapeRegex(variable.key), 'g');
        content = content.replace(regex, variable.value);
      }

      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      // If file is not text, skip it
      console.warn(`Skipping file ${filePath}:`, error);
    }
  }

  /**
   * Escape regex special characters
   */
  private escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Initialize Git repository
   */
  async initializeGit(projectPath: string): Promise<void> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    try {
      // Initialize git
      await execAsync('git init', { cwd: projectPath });
      
      // Add all files
      await execAsync('git add .', { cwd: projectPath });
      
      // Initial commit
      await execAsync('git commit -m "Initial commit from Digita Energy Admin"', {
        cwd: projectPath,
      });
    } catch (error) {
      console.error('Git initialization failed:', error);
      // Don't throw - Git is optional
    }
  }

  /**
   * Get absolute path to generated project
   */
  getProjectPath(projectSlug: string): string {
    return path.join(this.outputDir, projectSlug);
  }

  /**
   * Check if project directory exists
   */
  async projectExists(projectSlug: string): Promise<boolean> {
    try {
      const projectPath = this.getProjectPath(projectSlug);
      await fs.access(projectPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Delete project directory
   */
  async deleteProject(projectSlug: string): Promise<void> {
    const projectPath = this.getProjectPath(projectSlug);
    await fs.rm(projectPath, { recursive: true, force: true });
  }
}
