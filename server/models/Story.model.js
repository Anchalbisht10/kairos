import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isAnonymous: { type: Boolean, default: false },
  displayName: { type: String, required: true },
  avatar:      { type: String, default: '🌟' },
  location: {
    city:  String,
    state: String,
  },
  course:     String,
  year:       String,
  background: String,
  storyText:  { type: String, required: true, maxlength: 2000 },
  tags:       [String],
  likes:      { type: Number, default: 0 },
  likedBy:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isModerated:{ type: Boolean, default: false },
  isPublished:{ type: Boolean, default: false },
  isSeed:     { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Story', storySchema)