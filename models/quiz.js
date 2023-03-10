const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
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
  id: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: false
  },
  options: {
    type: [optionSchema],
    required: true
  }
});

const QuizSchema = new mongoose.Schema({
  questions: {
    type: [questionSchema],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;

