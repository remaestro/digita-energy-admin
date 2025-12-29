import { Router } from 'express'
import { getMe, getAllUsers } from '../controllers/user.controller.js'
import { authenticate } from '../middleware/auth.js'

export const userRouter = Router()

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/me', authenticate, getMe)

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
userRouter.get('/', authenticate, getAllUsers)
