import { Router } from 'express';
import { z } from 'zod';
import { deploymentController } from '../controllers/deployment.controller.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

const createDeploymentSchema = z.object({
  body: z.object({
    environment: z.enum(['development', 'staging', 'production']).optional(),
  }),
});

/**
 * @swagger
 * /api/projects/{projectId}/deployments:
 *   get:
 *     summary: Get all deployments for a project
 *     tags: [Deployments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of deployments
 */
router.get('/:projectId/deployments', deploymentController.getDeployments);

/**
 * @swagger
 * /api/projects/{projectId}/deployments:
 *   post:
 *     summary: Create new deployment
 *     tags: [Deployments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               environment:
 *                 type: string
 *                 enum: [development, staging, production]
 *     responses:
 *       201:
 *         description: Deployment started
 */
router.post('/:projectId/deployments', validate(createDeploymentSchema), deploymentController.createDeployment);

/**
 * @swagger
 * /api/projects/{projectId}/deployments/{deploymentId}:
 *   get:
 *     summary: Get deployment by ID
 *     tags: [Deployments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: deploymentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deployment details
 */
router.get('/:projectId/deployments/:deploymentId', deploymentController.getDeploymentById);

export default router;
