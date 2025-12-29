import { Router } from 'express';
import authRoutes from './auth.routes.js';
import templateRoutes from './template.routes.js';
import projectRoutes from './project.routes.js';
import deploymentRoutes from './deployment.routes.js';
import filesRoutes from './files.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/templates', templateRoutes);
router.use('/projects', projectRoutes);
router.use('/projects', deploymentRoutes);
router.use('/projects', filesRoutes);

export default router;
