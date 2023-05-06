
const mongoose = require('mongoose');
// const svyMCQSchema = require('./svyMCQ');

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

///////////////////////////////////
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
  new mongoose.Schema({ 
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
  })
  
  
  , options);




//////////////////////////////////////////////////

module.exports = {SurveyQuestion,SurveyMCQ,svyQuestionSchema};

