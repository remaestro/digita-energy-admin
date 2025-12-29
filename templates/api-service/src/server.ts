import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import { config } from './config/config.js'
import { logger } from './config/logger.js'
import { swaggerSpec } from './config/swagger.js'
import { router } from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import { notFoundHandler } from './middleware/notFoundHandler.js'

dotenv.config()

const app = express()
const PORT = config.port

// Security middleware
app.use(helmet())
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindow,
  max: config.rateLimitMax,
  message: 'Too many requests from this IP, please try again later.',
})
app.use('/api', limiter)

// Body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`)
  next()
})

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API Routes
app.use('/api/v1', router)

// Error handling
app.use(notFoundHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`)
  logger.info(`📝 API Documentation: http://localhost:${PORT}/api-docs`)
  logger.info(`🏥 Health check: http://localhost:${PORT}/health`)
})
