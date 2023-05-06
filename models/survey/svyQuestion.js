
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

