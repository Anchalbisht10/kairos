import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User.model.js'

dotenv.config()

async function resetPassword() {
  await mongoose.connect(process.env.MONGODB_URI)
  
  const newPassword = 'Kairos2026!'  // your new password
  const salt = await bcrypt.genSalt(12)
  const hashed = await bcrypt.hash(newPassword, salt)
  
  const user = await User.findOneAndUpdate(
    { email: 'chianya1017@gmail.com' },
    { password: hashed, isAdmin: true },
    { new: true }
  )
  
  if (user) {
    console.log(`✅ Password reset for ${user.name}`)
    console.log(`✅ isAdmin set to true`)
    console.log(`New password: Kairos2026!`)
  } else {
    console.log('❌ User not found')
  }
  
  process.exit(0)
}

resetPassword()