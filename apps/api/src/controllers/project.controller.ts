import { Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const projectController = {
  // Get all projects for authenticated user
  async getAllProjects(req: AuthRequest, res: Response) {
    const userId = req.user?.id;

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        template: {
          select: {
            name: true,
            type: true,
            icon: true,
          },
        },
        deployments: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: projects,
    });
  },

  // Get single project by ID
  async getProjectById(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    const project = await prisma.project.findFirst({
      where: { id, userId },
      include: {
        template: true,
        deployments: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    res.json({
      status: 'success',
      data: project,
    });
  },

  // Create new project
  async createProject(req: AuthRequest, res: Response) {
    const { name, description, templateId, config } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('User not authenticated', 401);
    }

    // Verify template exists
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });

    if (!template || !template.isActive) {
      throw new AppError('Invalid or inactive template', 400);
    }

    // Generate slug from name
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    // Check if slug already exists for this user
    const existing = await prisma.project.findFirst({
      where: { slug, userId },
    });

    if (existing) {
      throw new AppError('Project with this name already exists', 400);
    }

    const project = await prisma.project.create({
      data: {
        name,
        slug,
        description,
        templateId,
        userId,
        config,
        status: 'created',
      },
      include: {
        template: true,
      },
    });

    res.status(201).json({
      status: 'success',
      data: project,
    });
  },

  // Update project
  async updateProject(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const { name, description, config } = req.body;
    const userId = req.user?.id;

    const project = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        name,
        description,
        config,
      },
      include: {
        template: true,
      },
    });

    res.json({
      status: 'success',
      data: updated,
    });
  },

  // Delete project
  async deleteProject(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    const project = await prisma.project.findFirst({
      where: { id, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    // Delete generated files if they exist
    if (project.status === 'ready') {
      const { ProjectGeneratorService } = await import('../services/project-generator.service.js');
      const generatorService = new ProjectGeneratorService();
      await generatorService.deleteProjectFiles(project.slug);
    }

    // Delete from database
    await prisma.project.delete({
      where: { id },
    });

    res.status(204).send();
  },

  // Generate project from template
  async generateProject(req: AuthRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;

    const project = await prisma.project.findFirst({
      where: { id, userId },
      include: {
        template: true,
      },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.status === 'generating') {
      throw new AppError('Project is already being generated', 400);
    }

    if (project.status === 'ready') {
      throw new AppError('Project has already been generated', 400);
    }

    // Import and use the project generator service
    const { ProjectGeneratorService } = await import('../services/project-generator.service.js');
    const generatorService = new ProjectGeneratorService();

    // Start generation asynchronously
    generatorService.generateProject(id).catch((error) => {
      console.error('Background generation failed:', error);
    });

    res.json({
      status: 'success',
      message: 'Project generation started',
      data: { projectId: id, status: 'generating' },
    });
  },
};
