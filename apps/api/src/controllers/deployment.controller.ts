import { Response } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { AuthRequest } from '../middleware/auth.js';

export const deploymentController = {
  // Get all deployments for a project
  async getDeployments(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const userId = req.user?.id;

    // Verify project belongs to user
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    const deployments = await prisma.deployment.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: deployments,
    });
  },

  // Create new deployment
  async createDeployment(req: AuthRequest, res: Response) {
    const { projectId } = req.params;
    const { environment } = req.body;
    const userId = req.user?.id;

    // Verify project belongs to user
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    if (project.status !== 'ready') {
      throw new AppError('Project must be generated before deploying', 400);
    }

    const deployment = await prisma.deployment.create({
      data: {
        projectId,
        environment: environment || 'production',
        status: 'pending',
        triggeredBy: userId!,
      },
    });

    // TODO: Trigger actual deployment
    // For now, simulate deployment
    setTimeout(async () => {
      await prisma.deployment.update({
        where: { id: deployment.id },
        data: {
          status: 'success',
          deploymentUrl: `https://${project.slug}.netlify.app`,
        },
      });
    }, 5000);

    res.status(201).json({
      status: 'success',
      message: 'Deployment started',
      data: deployment,
    });
  },

  // Get deployment by ID
  async getDeploymentById(req: AuthRequest, res: Response) {
    const { projectId, deploymentId } = req.params;
    const userId = req.user?.id;

    // Verify project belongs to user
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) {
      throw new AppError('Project not found', 404);
    }

    const deployment = await prisma.deployment.findFirst({
      where: { id: deploymentId, projectId },
    });

    if (!deployment) {
      throw new AppError('Deployment not found', 404);
    }

    res.json({
      status: 'success',
      data: deployment,
    });
  },
};
