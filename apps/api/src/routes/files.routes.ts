import { Router } from 'express';
import { filesController } from '../controllers/files.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /api/projects/{id}/files:
 *   get:
 *     summary: Get project file structure
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project file structure
 */
router.get('/:id/files', filesController.getFileStructure);

/**
 * @swagger
 * /api/projects/{id}/download:
 *   get:
 *     summary: Download project as ZIP
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ZIP file download
 */
router.get('/:id/download', filesController.downloadProject);

/**
 * @swagger
 * /api/projects/{id}/file-content:
 *   get:
 *     summary: Get specific file content
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: filePath
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: File content
 */
router.get('/:id/file-content', filesController.getFileContent);

export default router;
