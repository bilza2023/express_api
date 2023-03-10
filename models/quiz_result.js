// Require the necessary packages
const mongoose = require('mongoose');

// Define the subscriber schema
const quizResultSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  wrongAnswers: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  }
  
});


// Export the model
module.exports = mongoose.model('QuizResult', quizResultSchema);
