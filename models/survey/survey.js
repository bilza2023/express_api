const mongoose = require('mongoose');

const {memberSchema} = require('./member');
const {svyQuestionSchema} = require("./svyQuestion");


//--user id & 1 question
const SurveySchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    // default : ""
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
    required: true,
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
    type: [memberSchema],
    required: false,
    default : []
  },
  questions: {
    type: [svyQuestionSchema],
    required: false,
    default : []
  }
});

////////////////////////////////////////////////////////
const SurveySchemaExtended = new mongoose.Schema({
  testId: {
    type: String,
    required: false,
    default: ''
  }
});

SurveySchemaExtended.add(SurveySchema);

const Survey = mongoose.model('Survey', SurveySchemaExtended, 'surveys');
// const Survey = mongoose.model('Survey', SurveySchema,  'surveys');
const Template = mongoose.model('Template', SurveySchema);
const Test = mongoose.model('Test', SurveySchema);

module.exports = {Survey , Template , Test} ;

