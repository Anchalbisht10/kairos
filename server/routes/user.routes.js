import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import User from '../models/User.model.js'

const router = express.Router()

// Update profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, avatar, age, location, course, year, bio, interests } = req.body
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar, age, location, course, year, bio, interests },
      { new: true }
    ).select('-password')
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Save scholarship
router.post('/scholarships/save', protect, async (req, res) => {
  try {
    const { scholarshipId, status, notes } = req.body
    const user = await User.findById(req.user._id)

    const existing = user.savedScholarships.find(
      s => s.scholarship.toString() === scholarshipId
    )

    if (existing) {
      existing.status = status || existing.status
      existing.notes  = notes  || existing.notes
    } else {
      user.savedScholarships.push({ scholarship: scholarshipId, status: status || 'saved', notes })
    }

    await user.save()
    res.json({ success: true, message: 'Scholarship saved!' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router