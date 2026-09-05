import express from 'express'
import { body } from 'express-validator'
import { signup, login, logout, getMe } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  signup
)

router.post('/login',  login)
router.post('/logout', logout)
router.get('/me',      protect, getMe)

export default router