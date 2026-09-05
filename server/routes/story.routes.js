import express from 'express'
import Story from '../models/Story.model.js'
import { protect, optionalAuth } from '../middleware/auth.middleware.js'

const router = express.Router()

// Get published stories
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 9, tag } = req.query
    const query = { isPublished: true }
    if (tag) query.tags = tag

    const total = await Story.countDocuments(query)
    const stories = await Story.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ likes: -1, createdAt: -1 })

    res.json({ success: true, stories, total })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Submit story
router.post('/', protect, async (req, res) => {
  try {
    const { displayName, isAnonymous, location, course, year, background, storyText, tags } = req.body

    const story = await Story.create({
      userId:      req.user._id,
      displayName: isAnonymous ? 'Anonymous' : displayName,
      isAnonymous,
      avatar:      req.user.avatar,
      location,
      course,
      year,
      background,
      storyText,
      tags,
      isPublished: false, // needs moderation
    })

    res.status(201).json({
      success: true,
      message: 'Your story has been submitted! It will be published after a quick review. 💜',
      story,
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Like a story
router.post('/:id/like', protect, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
    if (!story) return res.status(404).json({ message: 'Story not found.' })

    const liked = story.likedBy.includes(req.user._id)
    if (liked) {
      story.likes = Math.max(0, story.likes - 1)
      story.likedBy.pull(req.user._id)
    } else {
      story.likes += 1
      story.likedBy.push(req.user._id)
    }
    await story.save()
    res.json({ success: true, likes: story.likes, liked: !liked })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router