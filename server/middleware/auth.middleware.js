import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.kairos_token

    if (!token) {
      return res.status(401).json({ message: 'Not authorized. Please login.' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')

    if (!req.user) {
      return res.status(401).json({ message: 'User not found.' })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired.' })
  }
}

export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.kairos_token
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    }
    next()
  } catch (error) {
    next()
  }
}

export const adminOnly = async (req, res, next) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' })
    }
    next()
  } catch (error) {
    res.status(403).json({ message: 'Access denied.' })
  }
}