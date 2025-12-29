import { Router } from 'express';
import { templateController } from '../controllers/template.controller.js';

const router = Router();

/**
 * @swagger
 * /api/templates:
 *   get:
 *     summary: Get all templates
 *     tags: [Templates]
 *     responses:
 *       200:
 *         description: List of all active templates
 */
router.get('/', templateController.getAllTemplates);

/**
 * @swagger
 * /api/templates/{id}:
 *   get:
 *     summary: Get template by ID or slug
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Template details
 *       404:
 *         description: Template not found
 */
router.get('/:id', templateController.getTemplateById);

export default router;
