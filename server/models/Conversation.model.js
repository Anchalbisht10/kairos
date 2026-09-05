import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
  sender:    { type: String, enum: ['user','kai'], required: true },
  text:      { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  language:  { type: String, default: 'en' },
})

const conversationSchema = new mongoose.Schema({
  userId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [messageSchema],
  summary:  String,
  tags:     [String],
}, { timestamps: true })

export default mongoose.model('Conversation', conversationSchema)