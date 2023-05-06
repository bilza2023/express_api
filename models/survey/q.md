
I am creating a mongodb mongoose node.js and express app. I have a survey collection with an array of objects (called questions) which has question objects in it. 
These questions can be of many different types but has a base type which sahre data across all the questions.
I am using mongoose discriminator for these schemas.
THE PROBLEM is that when i save any question type other than the base type, the additional data is removed , though the __t field is added by mongoose.

Here is survey schema / model
const mongoose = require('mongoose');

const {memberSchema} = require('../member');
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
const Survey = mongoose.model('Survey', SurveySchema);

module.exports = Survey;

here is the base question schema and the discriminator schema for MCQ question type 

const mongoose = require('mongoose');
const svyMCQSchema = require('./svyMCQ');

const svyQuestionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default : false
  },
  content: {
    type: String,
    required: false
  },
  explanation: {
    type: String,
    required: false
  }
});
const SurveyQuestion  = mongoose.model('SurveyQuestion', svyQuestionSchema);
///////////////////////////////////
const options = { discriminatorKey: 'kind' };

const SurveyMCQ = SurveyQuestion.discriminator('SurveyMCQ',
  svyMCQSchema
  
  
  , options);




//////////////////////////////////////////////////

module.exports = {SurveyQuestion,SurveyMCQ,svyQuestionSchema};

and finally here is the MCQ question type 
const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  }
});
 
const svyMCQSchema = new mongoose.Schema({

  multiSelect: {
    type: Boolean,
    required: false,
    default : false
  },
  selectedOptions: {
    type: [String],
    required: true,
    default : []
  },
  displayOptions: {
    type: String,
    enum: ["dropdown", "radio", "check" , "bars"],
    required: true,
    default : "bars"
  },
  options: {
    type: [optionSchema],
    required: true
  }
});

const SvyMCQ  = mongoose.model('SvyMCQ', svyMCQSchema);

module.exports = {svyMCQSchema};

I am using then like this
const Survey = require("./models/survey/survey.js");
const {SurveyQuestion,SurveyMCQ} = require("./models/survey/svyQuestion.js");
// const {ClickedLinkEvent, Event} = require("./models/event");
// const baseQuestion = require('./tests/surveyBaseQ.js')
const Svy = require('./models/survey/tests/getSurvey.js')
const baseMCQ = require('./models/survey/tests/getMCQ.js')

app.get('/survey', async (req, res) =>{
// Svy.questions.push(baseQuestion);
// Svy.questions.push(baseMCQ);
let survey = new Survey( Svy );
const mcq = new SurveyMCQ(baseMCQ);
survey.questions.push(mcq);

      //  debugger;
    await survey.save();
    return res.status(200).json({success :true , survey});
});


I have some fake data made with which i am testing it.
This is the base question that gets saved well 


const baseQuestion = {
    id : '333de',
    required : true,
    content : "This is the base question",
    explanation : "This is the base question",
}

module.exports = baseQuestion;


here is the MCQ question which gets its extra data trimmed 

const baseMCQ = {
    id : '333de',
    required : true,
    content : "This is the base question",
    explanation : "This is the base question",
    multiSelect:true,
    selectedOptions :[],
    displayOptions : 'bars',
    options :[]
}

module.exports = baseMCQ;