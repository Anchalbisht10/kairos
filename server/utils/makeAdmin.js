import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.model.js'

dotenv.config()

async function makeAdmin() {
  await mongoose.connect(process.env.MONGODB_URI)
  
  const email = 'chianya1017@gmail.com' // ← put your actual email here
  
  const user = await User.findOneAndUpdate(
    { email },
    { isAdmin: true },
    { new: true }
  )
  
  if (user) {
    console.log(`✅ ${user.name} is now admin!`)
  } else {
    console.log('❌ User not found — make sure you signed up first')
  }
  
  process.exit(0)
}

makeAdmin()