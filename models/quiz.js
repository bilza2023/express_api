const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  id: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});
 
const questionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: false
  },
  id: { //This is not mongodb _id rather the app assigned id
    type: String,
    required: true
  },
  correctOption: {
    type: String,
    required: false
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
   questions: {
    type: [questionSchema],
    required: true
  },
  title: { 
    type: String,
    required: false,
    default : ""
  },
  userId: {
    type: String,
    required: true
  },
  saveResponse: {
    type: Boolean,
    required: false,
    default : false
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
    default : "",
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
    default : "",
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
  dispatchTo: {
    type: String,
    enum: ["anyone", "selected", "team"],
    required: true,
    default: "anyone"
  }
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;

