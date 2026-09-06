import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import User from '../models/User.model.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

const setCookie = (res, token) => {
  res.cookie('kairos_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
}

export const signup = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, avatar, age, location, course, year } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered.' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar:   avatar || '🌟',
      age,
      location,
      course,
      year,
    })

    // Generate token and set cookie
    const token = generateToken(user._id)
    setCookie(res, token)

    res.status(201).json({
      success: true,
      user: {
        _id:      user._id,
        name:     user.name,
        email:    user.email,
        avatar:   user.avatar,
        location: user.location,
        course:   user.course,
        year:     user.year,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Server error during signup.' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    // Generate token
    const token = generateToken(user._id)
    setCookie(res, token)

    res.json({
      success: true,
      user: {
        _id:      user._id,
        name:     user.name,
        email:    user.email,
        avatar:   user.avatar,
        location: user.location,
        course:   user.course,
        year:     user.year,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error during login.' })
  }
}

export const logout = async (req, res) => {
  res.clearCookie('kairos_token', {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
})
  res.json({ success: true, message: 'Logged out successfully.' })
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('savedScholarships.scholarship')
    res.json({ success: true, user })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
}