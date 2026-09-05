import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

// Routes
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import kaiRoutes from './routes/kai.routes.js'
import scholarshipRoutes from './routes/scholarship.routes.js'
import storyRoutes from './routes/story.routes.js'
import askRoutes from './routes/ask.routes.js'
import compassRoutes from './routes/compass.routes.js'
import feedbackRoutes from './routes/feedback.routes.js'
import adminRoutes from './routes/admin.routes.js'

dotenv.config()

const app = express()

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many auth attempts, please try again later.'
})
// Middleware
app.use(cors({
  origin: ['http://localhost:5173', process.env.CLIENT_URL],
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use('/api', limiter)

// Routes
app.use('/api/auth',        authLimiter, authRoutes)
app.use('/api/users',       userRoutes)
app.use('/api/kai',         kaiRoutes)
app.use('/api/scholarships',scholarshipRoutes)
app.use('/api/stories',     storyRoutes)
app.use('/api/ask',         askRoutes)
app.use('/api/compass',     compassRoutes)
app.use('/api/feedback',    feedbackRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'KAIROS backend is running 💜' })
})

import { startScholarshipUpdater } from './utils/scholarshipUpdater.js'

// Connect DB and start server
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ KAIROS server running on port ${process.env.PORT || 5000}`)
      startScholarshipUpdater()
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err)
    process.exit(1)
  })

export default app