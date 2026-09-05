import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import { adminOnly } from '../middleware/auth.middleware.js'
import User from '../models/User.model.js'
import Story from '../models/Story.model.js'
import Question from '../models/Question.model.js'
import Feedback from '../models/Feedback.model.js'
import Scholarship from '../models/Scholarship.model.js'

const router = express.Router()

// All admin routes are protected
router.use(protect, adminOnly)

// ── DASHBOARD STATS ──
router.get('/stats', async (req, res) => {
  try {
    const [users, stories, questions, feedback, scholarships] = await Promise.all([
      User.countDocuments(),
      Story.countDocuments(),
      Question.countDocuments(),
      Feedback.countDocuments(),
      Scholarship.countDocuments({ isActive: true }),
    ])
    const pendingStories   = await Story.countDocuments({ isPublished: false })
    const publishedStories = await Story.countDocuments({ isPublished: true })
    const avgRating = await Feedback.aggregate([
      { $group: { _id: null, avg: { $avg: '$stars' } } }
    ])

    res.json({
      success: true,
      stats: {
        users,
        stories,
        pendingStories,
        publishedStories,
        questions,
        feedback,
        scholarships,
        avgRating: avgRating[0]?.avg?.toFixed(1) || 0,
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// ── STORIES ──
router.get('/stories', async (req, res) => {
  try {
    const { status = 'pending' } = req.query
    const query = status === 'pending'
      ? { isPublished: false }
      : { isPublished: true }
    const stories = await Story.find(query).sort({ createdAt: -1 })
    res.json({ success: true, stories })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.put('/stories/:id/approve', async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(
      req.params.id,
      { isPublished: true, isModerated: true },
      { new: true }
    )
    res.json({ success: true, story, message: 'Story approved and published! 💜' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.delete('/stories/:id', async (req, res) => {
  try {
    await Story.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Story removed.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// ── SCHOLARSHIPS ──
router.get('/scholarships', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 })
    res.json({ success: true, scholarships })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.post('/scholarships', async (req, res) => {
  try {
    const scholarship = await Scholarship.create(req.body)
    res.status(201).json({ success: true, scholarship, message: 'Scholarship added! ✅' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.put('/scholarships/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    )
    res.json({ success: true, scholarship, message: 'Scholarship updated! ✅' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.delete('/scholarships/:id', async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Scholarship removed.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// ── QUESTIONS ──
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 }).limit(50)
    res.json({ success: true, questions })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.delete('/questions/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Question removed.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// ── FEEDBACK ──
router.get('/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ stars: -1, createdAt: -1 })
    res.json({ success: true, feedback })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.delete('/feedback/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Feedback removed.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// ── USERS ──
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 }).limit(100)
    res.json({ success: true, users })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router