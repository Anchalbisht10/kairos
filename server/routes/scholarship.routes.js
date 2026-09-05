import express from 'express'
import Scholarship from '../models/Scholarship.model.js'
import { protect, optionalAuth } from '../middleware/auth.middleware.js'

const router = express.Router()

// Get all scholarships with filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { category, state, gender, course, search, page = 1, limit = 12 } = req.query
const query = { isActive: true }

// Auto-hide scholarships with passed deadlines
// Only show ones with future deadlines OR no specific date
const currentMonth = new Date().toLocaleString('en-IN', { month: 'long' })
const currentYear  = new Date().getFullYear()

if (category && category !== 'All') {
  if (category === 'Girl-Specific') {
    query['eligibility.genderSpecific'] = 'Girls Only'
  } else {
    query.providerType = category
  }
}

if (state && state !== 'All India') {
  query['eligibility.states'] = { $in: [state, 'All India'] }
} else if (state === 'All India' || !state) {
  query['eligibility.states'] = { $in: ['All India'] }
}
    if (search) query.$text = { $search: search }

    const total = await Scholarship.countDocuments(query)
    const scholarships = await Scholarship.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 })

    res.json({ success: true, scholarships, total, pages: Math.ceil(total / limit) })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Get single scholarship
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id)
    if (!scholarship) return res.status(404).json({ message: 'Scholarship not found.' })
    res.json({ success: true, scholarship })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router