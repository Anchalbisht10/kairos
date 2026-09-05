import express from 'express'
import Question from '../models/Question.model.js'
import { protect, optionalAuth } from '../middleware/auth.middleware.js'
import Groq from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Get questions
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query
    const query = { isPublic: true, isModerated: true }
    if (category) query.category = category
    if (search) query.$text = { $search: search }

    const questions = await Question.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ upvotes: -1, createdAt: -1 })

    res.json({ success: true, questions })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Ask a question
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { questionText, category, isAnonymous } = req.body

    if (!questionText?.trim()) {
      return res.status(400).json({ message: 'Question is required.' })
    }

    // Get KAI's answer via Groq
    const completion = await groq.chat.completions.create({
   model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: `You are KAI, a warm AI companion for first-generation students in India. 
          Answer this question helpfully, warmly, and in plain English. 
          Be specific and practical. Keep it under 200 words.`
        },
        { role: 'user', content: questionText }
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const kaiResponse = completion.choices[0]?.message?.content || 
      "Great question! Let me help you with this."

    const question = await Question.create({
      userId:      req.user?._id,
      isAnonymous: isAnonymous ?? true,
      questionText,
      category:    category || 'other',
      kaiResponse,
      isPublic:    true,
      isModerated: true,
    })

    res.status(201).json({ success: true, question })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

// Upvote question
router.post('/:id/upvote', protect, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
    if (!question) return res.status(404).json({ message: 'Question not found.' })
    question.upvotes = (question.upvotes || 0) + 1
    await question.save()
    res.json({ success: true, upvotes: question.upvotes })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router