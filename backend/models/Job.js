const mongoose = require('mongoose');

const statusValues = ['Applied', 'Online Assessment', 'Interview', 'HR Round', 'Offer', 'Rejected'];
const jobTypeValues = ['Full-Time', 'Internship', 'Remote', 'Hybrid', 'Onsite'];

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    jobRole: {
      type: String,
      required: [true, 'Job role is required'],
      trim: true,
      maxlength: [100, 'Job role cannot exceed 100 characters']
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: [100, 'Location cannot exceed 100 characters']
    },
    applicationDate: {
      type: Date,
      required: [true, 'Application date is required']
    },
    status: {
      type: String,
      enum: statusValues,
      default: 'Applied'
    },
    jobType: {
      type: String,
      enum: jobTypeValues,
      default: 'Full-Time'
    },
    salary: {
      type: String,
      default: ''
    },
    jobUrl: {
      type: String,
      trim: true,
      default: ''
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters'],
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Job', jobSchema);
