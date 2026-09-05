import mongoose from 'mongoose'

const scholarshipSchema = new mongoose.Schema({
  title:        { type: String, required: true, trim: true },
  provider:     { type: String, required: true, trim: true },
  providerType: {
    type: String,
    enum: ['Central Government','State Government','NGO','Private','Girl-Specific','Minority'],
    required: true,
  },
  eligibility: {
    states:        [String],
    categories:    [String],
    incomeLimit:   Number,
    courseLevels:  [String],
    genderSpecific:{ type: String, enum: ['All','Girls Only','Boys Only'], default: 'All' },
    minMarks:      Number,
    maxAge:        Number,
  },
  amount:          { type: Number, required: true },
  amountDesc:      String,
  deadline:        String,
  applicationLink: { type: String, required: true },
  documentsRequired: [String],
  applicationSteps:  [String],
  tips:              [String],
  description:       { type: String, required: true },
  isActive:          { type: Boolean, default: true },
  tags:              [String],
}, { timestamps: true })

export default mongoose.model('Scholarship', scholarshipSchema)