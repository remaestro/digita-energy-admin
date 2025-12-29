import { Router } from 'express'
import { authRouter } from './auth.routes.js'
import { userRouter } from './user.routes.js'

export const router = Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: API root endpoint
 *     description: Returns API information
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to {{PROJECT_NAME}} API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      docs: '/api-docs',
    },
  })
})

router.use('/auth', authRouter)
router.use('/users', userRouter)
