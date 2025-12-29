import { Router } from 'express'
import { healthController } from '../controllers/healthController.js'

export const router = Router()

router.get('/health', healthController)

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to {{PROJECT_NAME}} API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
    },
  })
})
