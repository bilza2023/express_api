const mongoose = require('mongoose');

const {memberSchema} = require('./member');
const {svyQuestionSchema} = require("./svyQuestion");
const {publishObjSchema} = require("./publishObj");


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
  classId: {
    type: String,
    default : "",
    required: false
  },
   createdAt: {
    type: Date,
    default: Date.now
  }, 
   members: {
    type: [String],
    required: false,
    default : []
  },
  marks: {  //Marks per question
    type: Number,
    required: true,
    default : 10
  },
  questions: {
    type: [svyQuestionSchema],
    required: false,
    default : []
  },
  publishObj: {
    type: publishObjSchema,
    required: false,
  },
  tags : {
      type: [String],
    required: false,
    default : []
  },
  displayQOneByOne : {
      type: Boolean,
    required: false,
    default : false
  }
});


const Run = mongoose.model('Run', SurveySchema );
const Test = mongoose.model('Test', SurveySchema);

module.exports = {Run , Test} ;
