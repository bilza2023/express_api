// Require the necessary packages
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  quizId: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  userId: { 
    type: String,
    required: true
  },
  correctAnswers: {
    type: [String],
    required: false,
    default : []
  },
  skippedAnswers: {
    type: [String],
    required: false,
    default : []
  },
  countryCode: {
    type: String,
    required: false,
    default : ""
  },
  wrongAnswers: {
    type: [String],
    required: false,
    default : []
  },
   createdAt: {
    type: Date,
    default: Date.now
  },
  email: { 
    type: String,
    required: false
  },
  ip: { 
    type: String,
    required: false
  }
});

// Export the model
module.exports = mongoose.model('Result', resultSchema);
