const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  }
});

const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: Number,
    required: true
  },
  selectedAnswer: {
    type: Number,
    default: null
  },
  explanation: {
    type: String,
    required: true
  },
  answers: {
    type: [answerSchema],
    required: true
  }
});

const QuizSchema = new mongoose.Schema({
  questions: {
    type: [questionSchema],
    required: true
  }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;

