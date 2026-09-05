import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
    default: '🌟',
  },
  age: Number,
  location: {
    city:  { type: String, trim: true },
    state: { type: String, trim: true },
  },
  course:    { type: String, trim: true },
  year:      { type: String, trim: true },
  bio:       { type: String, maxlength: 200 },
  interests: [String],
  compassResults: [{
    paths:     mongoose.Schema.Types.Mixed,
    takenAt:   { type: Date, default: Date.now },
  }],
  savedScholarships: [{
    scholarship: { type: mongoose.Schema.Types.ObjectId, ref: 'Scholarship' },
    status:      { type: String, enum: ['saved','applied','pending','won'], default: 'saved' },
    notes:       String,
    savedAt:     { type: Date, default: Date.now },
  }],
  isVerified:      { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  privacySettings: {
    anonymousMode:   { type: Boolean, default: false },
    showLocation:    { type: Boolean, default: true },
    showCourse:      { type: Boolean, default: true },
  },
}, { timestamps: true })

export default mongoose.model('User', userSchema)