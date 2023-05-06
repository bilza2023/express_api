
const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };


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


///////////////////////////////////--MCQ--////////////////////////
//---Options schema for MCQ
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

//..

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

///////////////////////////////////--Input --////////////////////////

const SurveyInput = SurveyQuestion.discriminator('SurveyInput',
  new mongoose.Schema({ 
        payload: {
          type: String,
          required: true
        }
  })
  , options);


//..Export section
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//SurveyQuestion dont export since its abstract
module.exports = {svyQuestionSchema,SurveyMCQ , SurveyInput};

