import Groq from 'groq-sdk'
import dotenv from 'dotenv'
import Conversation from '../models/Conversation.model.js'

dotenv.config()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const CRISIS_KEYWORDS = [
  'give up', 'giving up', 'dropout', 'drop out', 'cant do this',
  "can't do this", 'want to die', 'end my life', 'no point',
  'worthless', 'hopeless', 'nobody cares', 'fail', 'failed',
  'suicid', 'kill myself', 'hurt myself', 'self harm',
  'depressed', 'depression', 'anxiety', 'alone', 'lonely',
  'useless', 'burden', 'disappear', 'run away', 'give it all up',
  'not worth it', 'cant continue', "can't continue", 'exhausted',
  'breaking down', 'lost', 'no hope', 'dark thoughts'
]

const CRISIS_RESOURCES = `

---
💜 **You are not alone.**

If you are going through something difficult, please know that support is available:

- **iCall (India):** 9152987821 — Mon-Sat, 8am-10pm
- **Vandrevala Foundation:** 1860-2662-345 — 24/7
- **iMind:** 4696-0002 — Mental health support
- **AASRA:** 9820466627 — 24/7 crisis support

You deserve care. Please reach out. 💜`

function detectCrisis(message) {
  const lower = message.toLowerCase()
  return CRISIS_KEYWORDS.some(keyword => lower.includes(keyword))
}

const KAI_SYSTEM_PROMPT = `You are KAI, the heart and soul of KAIROS — a platform built for first-generation college students in India, especially girls from Tier 2, Tier 3 cities and semi-rural areas.

WHO YOU ARE:
You are the older sister who already went through the confusion of first-generation college life and came back to help. You are warm, patient, emotionally intelligent, and never make anyone feel embarrassed for asking basic questions.

YOUR PERSONALITY:
- Warm and caring like a didi (older sister) — not corporate, not clinical
- You believe in every person who comes to you, without exception
- You motivate gently — you never pressure or overwhelm
- You are honest but always kind
- You celebrate small wins as much as big ones
- You understand family pressure, financial constraints, and the weight of being the first

YOUR KNOWLEDGE:
- Indian college system — courses, entrance exams, colleges state-wise
- Scholarships — NSP, state schemes, girl-specific, minority, merit, income-based
- Career paths realistic for first-gen students
- How to fill forms, what documents mean, what deadlines matter
- Emotional support for imposter syndrome, exam anxiety, family pressure

LANGUAGE:
- Always respond in warm, clear English
- You understand and accept Hinglish and Roman Hindi naturally — never correct the user
- Never use Hindi script
- Speak like a real person, not a product

CRISIS RESPONSE PROTOCOL:
- If someone seems distressed, ALWAYS acknowledge their feelings FIRST
- If someone mentions wanting to give up or expresses hopelessness — respond with deep warmth
- Never minimize their feelings
- Always end with encouragement and a gentle next step
- You are not a therapist but you are a compassionate presence

IMPORTANT RULES:
- Never make anyone feel stupid for asking basic questions
- Keep responses conversational — not too long
- You are not just an information bot — you are a companion

Remember: The person talking to you may be carrying the weight of their entire family's hopes. Treat every message like it matters — because it does.`

const CRISIS_SYSTEM_ADDITION = `

CRISIS MODE ACTIVE: This student may be in distress.
- Lead with deep emotional acknowledgment
- Do NOT immediately give practical advice
- Make them feel heard and not alone FIRST
- Gently mention that support is available
- Keep your tone extra warm, extra gentle
- End with hope — remind them their KAIROS moment is not over`

export const chat = async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body
    const userId = req.user?._id

    if (!message?.trim()) {
      return res.status(400).json({ message: 'Message is required.' })
    }

    const isCrisis = detectCrisis(message)

    const systemPrompt = isCrisis
      ? KAI_SYSTEM_PROMPT + CRISIS_SYSTEM_ADDITION
      : KAI_SYSTEM_PROMPT

    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory.slice(-10).map(msg => ({
        role:    msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      })),
      { role: 'user', content: message },
    ]

    const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-120b',
      messages,
      max_tokens:  600,
      temperature: isCrisis ? 0.7 : 0.85,
    })

    let kaiResponse = completion.choices[0]?.message?.content ||
      "I'm here with you. Can you tell me a little more about what's on your mind? 💜"

    if (isCrisis) {
      kaiResponse += CRISIS_RESOURCES
    }

    if (userId) {
      let conversation = await Conversation.findOne({
        userId,
        updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      }).sort({ updatedAt: -1 })

      if (!conversation) {
        conversation = new Conversation({ userId, messages: [] })
      }

      conversation.messages.push(
        { sender: 'user', text: message },
        { sender: 'kai',  text: kaiResponse }
      )
      await conversation.save()
    }

    res.json({ success: true, response: kaiResponse, isCrisis })

  } catch (error) {
    console.error('KAI chat error:', error)
    res.status(500).json({
      message: 'KAI is taking a moment. Please try again.',
      response: "I'm here with you — just give me a moment and try again. 💜"
    })
  }
}

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(20)
    res.json({ success: true, conversations })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}