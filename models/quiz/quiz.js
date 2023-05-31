const mongoose = require('mongoose');
const {questionSchema} = require("./question");

const membersSchema = new mongoose.Schema({
  email: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false,
    default : ""
  }
});

//--user id & 1 question
const QuizSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    default : ""
  },
  userId: {
    type: String,
    required: true
  },
  saveResponse: {
    type: Boolean,
    default : true,
    required: false
  },
  published: {
    type: Boolean,
    required: false,
    default : false
  },
  showIntro: {
    type: Boolean,
    default : true,
    required: false
  },
  introText: {
    type: String,
    default : "Welcome",
    required: false
  },
  published: {
    type: Boolean,
    required: false,
    default : false
  },
  showResult: {
    type: Boolean,
    default : true,
    required: false
  },
  showfarewellText: {
    type: Boolean,
    default : true,
    required: false
  },
  farewellText: {
    type: String,
    default : "Goodbye",
    required: false
  },
   createdAt: {
    type: Date,
    default: Date.now
  }, 
   members: {
    type: [membersSchema],
    required: false,
    default : []
  },
  quizType: {
    type: String,
    enum: ["quiz", "survey", "poll"],
    required: true,
    default: "quiz"
  },
  questions: {
    type: [questionSchema],
    required: false,
    default : []
  }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;

