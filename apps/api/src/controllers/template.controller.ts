import { Response } from 'express';
import { prisma } from '../config/database.js';

export const templateController = {
  // Get all active templates
  async getAllTemplates(_req: any, res: Response) {
    const templates = await prisma.template.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });

    res.json({
      status: 'success',
      data: templates,
    });
  },

  // Get single template by ID or slug
  async getTemplateById(req: any, res: Response) {
    const { id } = req.params;

    const template = await prisma.template.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
        isActive: true,
      },
    });

    if (!template) {
      res.status(404).json({
        status: 'error',
        message: 'Template not found',
      });
      return;
    }

    res.json({
      status: 'success',
      data: template,
    });
  },
};
