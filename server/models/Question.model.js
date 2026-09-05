import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isAnonymous: { type: Boolean, default: true },
  questionText:{ type: String, required: true, maxlength: 1000 },
  category: {
    type: String,
    enum: ['career','scholarship','exam','family','personal','other'],
    default: 'other',
  },
  kaiResponse:    String,
  humanResponses: [{
    text:      String,
    addedAt:   { type: Date, default: Date.now },
  }],
  upvotes:    { type: Number, default: 0 },
  upvotedBy:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isPublic:   { type: Boolean, default: true },
  isModerated:{ type: Boolean, default: false },
  tags:       [String],
}, { timestamps: true })

export default mongoose.model('Question', questionSchema)