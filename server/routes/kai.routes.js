import express from 'express'
import { chat, getConversations } from '../controllers/kai.controller.js'
import { protect, optionalAuth } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/chat',          optionalAuth, chat)
router.get('/conversations',  protect, getConversations)

export default router