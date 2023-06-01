const mongoose = require('mongoose');

//-------------------------------------
const openAnswerSchema = new mongoose.Schema({
   questionId: {
    type: String,
    required: true
   }, 
   questionType: { 
    type: String,
    enum: ['SurveyMCQ', 'SurveyInput', 'SurveyParagraph', 'SurveyNumber', 'SurveyUrl', 'SurveyPassword', 'SurveyEmail'],
    required: true
  },
  payload: {
    type: String,
    required: false
  },
});
//-------------------------------------

//--user id & 1 question
const SurveySchema = new mongoose.Schema({
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
  wrongAnswers: {
    type: [String],
    required: false,
    default : []
  },
  openAnswers: {
    type: [openAnswerSchema],
    required: false,
    default : []
  },
  countryCode: {
    type: String,
    required: false,
    default : ""
  },
   createdAt: {
    type: Date,
    default: Date.now
  },
  memberEmail: { 
    type: String,
    required: false
  },
  ip: { 
    type: String,
    required: false
  }
});

////////////////////////////////////////////////////////
const Result = mongoose.model('Result', SurveySchema,  'results');

module.exports = Result;

