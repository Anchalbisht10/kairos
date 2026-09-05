import express from 'express'
import { protect } from '../middleware/auth.middleware.js'
import Groq from 'groq-sdk'
import dotenv from 'dotenv'
dotenv.config()
import User from '../models/User.model.js'

const router = express.Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/analyze', protect, async (req, res) => {
  try {
    const { answers } = req.body

    const prompt = `You are KAI, a warm career counselor for first-generation Indian students.

Based on this student's profile, suggest exactly 3 realistic career paths.

Student Profile:
- Interests: ${answers.interests}
- Current Education: ${answers.education}  
- Marks: ${answers.marks}
- Location: ${answers.location}
- Financial Situation: ${answers.financial}
- Family Expectations: ${answers.family}
- 5-Year Goal: ${answers.goals}

Respond with ONLY a JSON array, no other text, no markdown, no backticks.
Format exactly like this:
[
  {
    "name": "Software Developer",
    "whySuitable": "Because you love computers and problem solving",
    "educationPath": "BCA or B.Tech CSE from a local college, then build projects",
    "salaryRange": "₹3-8 lakhs per year starting, growing to ₹15+ lakhs",
    "scholarship": "AICTE Pragati Scholarship — ₹50,000/year for girls in technical courses",
    "encouragement": "Your 68% is absolutely enough to start this journey. Many top developers started exactly where you are."
  },
  {
    "name": "...",
    "whySuitable": "...",
    "educationPath": "...",
    "salaryRange": "...",
    "scholarship": "...",
    "encouragement": "..."
  },
  {
    "name": "...",
    "whySuitable": "...",
    "educationPath": "...",
    "salaryRange": "...",
    "scholarship": "...",
    "encouragement": "..."
  }
]`

    const completion = await groq.chat.completions.create({
   model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content: 'You are a career counselor. Respond ONLY with valid JSON array. No markdown, no backticks, no explanation. Just the JSON array.'
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    let careers = []
    try {
      const text = completion.choices[0]?.message?.content || '[]'
      const cleaned = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()
      // Find JSON array in response
      const match = cleaned.match(/\[[\s\S]*\]/)
      if (match) {
        careers = JSON.parse(match[0])
      }
    } catch (parseErr) {
      console.error('Parse error:', parseErr)
      careers = []
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: { compassResults: { paths: careers } }
    })

    res.json({ success: true, careers })
  } catch (error) {
    console.error('Compass error:', error)
    res.status(500).json({ message: 'Server error.' })
  }
})

export default router