import { prisma } from '../config/database.js';
import { FileSystemService, TemplateVariable } from './filesystem.service.js';
import { logger } from '../config/logger.js';

export class ProjectGeneratorService {
  private fileSystemService: FileSystemService;

  constructor() {
    this.fileSystemService = new FileSystemService();
  }

  /**
   * Generate a project from a template
   */
  async generateProject(projectId: string): Promise<void> {
    try {
      // Get project with template
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { template: true },
      });

      if (!project) {
        throw new Error('Project not found');
      }

      if (!project.template) {
        throw new Error('Template not found');
      }

      logger.info(`Starting generation for project: ${project.name}`);

      // Update status to generating
      await prisma.project.update({
        where: { id: projectId },
        data: { status: 'generating' },
      });

      // Check if template exists
      const templateExists = await this.fileSystemService.templateExists(
        project.template.slug
      );

      if (!templateExists) {
        throw new Error(`Template ${project.template.slug} not found in filesystem`);
      }

      // Prepare variables for substitution
      const variables = this.prepareVariables(project);

      // Copy template files
      logger.info(`Copying template: ${project.template.slug}`);
      const projectPath = await this.fileSystemService.copyTemplate(
        project.template.slug,
        project.slug
      );

      // Substitute variables in files
      logger.info('Substituting variables in files');
      await this.fileSystemService.substituteVariables(projectPath, variables);

      // Initialize Git repository
      logger.info('Initializing Git repository');
      await this.fileSystemService.initializeGit(projectPath);

      // Generate a mock GitHub URL (in production, this would create actual repo)
      const repoUrl = `https://github.com/${project.userId}/${project.slug}`;

      // Update project status to ready
      await prisma.project.update({
        where: { id: projectId },
        data: {
          status: 'ready',
          repoUrl,
        },
      });

      logger.info(`Project generation complete: ${project.name}`);
    } catch (error) {
      logger.error('Project generation failed:', error);

      // Update status to error
      await prisma.project.update({
        where: { id: projectId },
        data: { status: 'error' },
      });

      throw error;
    }
  }

  /**
   * Prepare template variables for substitution
   */
  private prepareVariables(project: any): TemplateVariable[] {
    const config = project.config || {};

    const variables: TemplateVariable[] = [
      { key: '{{PROJECT_NAME}}', value: project.name },
      { key: '{{PROJECT_DESCRIPTION}}', value: project.description || project.name },
      { key: '{{PROJECT_SLUG}}', value: project.slug },
    ];

    // Add template-specific variables from config
    if (config.DATABASE_URL) {
      variables.push({ key: '{{DATABASE_URL}}', value: config.DATABASE_URL });
    } else {
      // Provide default
      variables.push({
        key: '{{DATABASE_URL}}',
        value: `postgresql://postgres:postgres@localhost:5432/${project.slug}`,
      });
    }

    if (config.SUPABASE_URL) {
      variables.push({ key: '{{SUPABASE_URL}}', value: config.SUPABASE_URL });
    } else {
      variables.push({
        key: '{{SUPABASE_URL}}',
        value: 'https://your-project.supabase.co',
      });
    }

    if (config.SUPABASE_ANON_KEY) {
      variables.push({ key: '{{SUPABASE_ANON_KEY}}', value: config.SUPABASE_ANON_KEY });
    } else {
      variables.push({
        key: '{{SUPABASE_ANON_KEY}}',
        value: 'your-anon-key-here',
      });
    }

    if (config.JWT_SECRET) {
      variables.push({ key: '{{JWT_SECRET}}', value: config.JWT_SECRET });
    } else {
      // Generate a random JWT secret
      variables.push({
        key: '{{JWT_SECRET}}',
        value: this.generateRandomSecret(64),
      });
    }

    if (config.PORT) {
      variables.push({ key: '{{PORT}}', value: config.PORT });
    } else {
      variables.push({ key: '{{PORT}}', value: '3000' });
    }

    // Landing page specific
    if (config.SITE_URL) {
      variables.push({ key: '{{SITE_URL}}', value: config.SITE_URL });
    } else {
      variables.push({
        key: '{{SITE_URL}}',
        value: `https://${project.slug}.netlify.app`,
      });
    }

    if (config.CONTACT_EMAIL) {
      variables.push({ key: '{{CONTACT_EMAIL}}', value: config.CONTACT_EMAIL });
    } else {
      variables.push({ key: '{{CONTACT_EMAIL}}', value: 'contact@example.com' });
    }

    // Mobile app specific
    if (config.APP_SLUG) {
      variables.push({ key: '{{APP_SLUG}}', value: config.APP_SLUG });
    } else {
      variables.push({ key: '{{APP_SLUG}}', value: project.slug });
    }

    return variables;
  }

  /**
   * Generate random secret
   */
  private generateRandomSecret(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Delete generated project files
   */
  async deleteProjectFiles(projectSlug: string): Promise<void> {
    try {
      await this.fileSystemService.deleteProject(projectSlug);
      logger.info(`Deleted project files: ${projectSlug}`);
    } catch (error) {
      logger.error('Failed to delete project files:', error);
      // Don't throw - allow project deletion even if files fail to delete
    }
  }
}
