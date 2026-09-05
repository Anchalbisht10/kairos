import express from 'express'
import Feedback from '../models/Feedback.model.js'
import { protect, optionalAuth } from '../middleware/auth.middleware.js'

const router = express.Router()

// Get public feedback sorted by stars
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find({ isPublic: true })
      .sort({ stars: -1, createdAt: -1 })
      .limit(50)
    res.json({ success: true, feedback })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Submit feedback
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { stars, emoji, message, isAnonymous } = req.body

    if (!stars || !emoji) {
      return res.status(400).json({ message: 'Stars and emoji are required.' })
    }

    const feedback = await Feedback.create({
      userId:      req.user?._id,
      stars,
      emoji,
      message,
      isAnonymous: isAnonymous ?? true,
      displayName: isAnonymous ? 'Anonymous' : req.user?.name,
      avatar:      req.user?.avatar || '🌟',
      isPublic:    true,
    })

    res.status(201).json({ success: true, feedback, message: 'Thank you for your feedback! 💜' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router