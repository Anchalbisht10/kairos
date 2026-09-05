import mongoose from 'mongoose'

const feedbackSchema = new mongoose.Schema({
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stars:     { type: Number, required: true, min: 1, max: 5 },
  emoji:     { type: String, required: true },
  message:   { type: String, maxlength: 500 },
  isPublic:  { type: Boolean, default: true },
  isAnonymous:{ type: Boolean, default: true },
  displayName: String,
  avatar:    String,
}, { timestamps: true })

export default mongoose.model('Feedback', feedbackSchema)