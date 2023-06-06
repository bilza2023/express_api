
I am getting this error in my node.js mongoose app.



"ValidationError: SurveyResult validation failed: answers.1.selectedOptions.0: Cast to [string] failed for value \"[ [ '1eba9f7b-02dc-4bf3-bd77-bf13570a5118' ] ]\" (type string) at path \"selectedOptions.0\" because of \"CastError\"\n    at Document.invalidate (C:\\expressApi\\node_modules\\mongoose\\lib\\document.js:3081:32)\n    at Subdocument.invalidate (C:\\expressApi\\node_modules\\mongoose\\lib\\types\\subdocument.js:225:12)\n    at EmbeddedDocument.$set (C:\\expressApi\\node_modules\\mongoose\\lib\\document.js:1429:12)\n    at EmbeddedDocument.$set (C:\\expressApi\\node_modules\\mongoose\\lib\\document.js:1112:16)\n    at EmbeddedDocument.Document (C:\\expressApi\\node_modules\\mongoose\\lib\\document.js:165:12)\n    at EmbeddedDocument.Subdocument (C:\\expressApi\\node_modules\\mongoose\\lib\\types\\subdocument.js:30:12)\n    at EmbeddedDocument.ArraySubdocument [as constructor] (C:\\expressApi\\node_modules\\mongoose\\lib\\types\\ArraySubdocument.js:36:15)\n    at new EmbeddedDocument (C:\\expressApi\\node_modules\\mongoose\\lib\\schema\\documentarray.js:134:17)\n    at DocumentArrayPath.cast (C:\\expressApi\\node_modules\\mongoose\\lib\\schema\\documentarray.js:507:22)\n    at SchemaType.applySetters (C:\\expressApi\\node_modules\\mongoose\\lib\\schematype.js:1202:12)"

Here is model for answer and result

const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  questionId: { 
    type: String,
    required: true
  },
 totalMarks: {
    type: Number,
    required: true,
    default : 10
  },
  required: {
    type: Boolean,
    required: true,
    default : false
  },
  payload: {
    type: String,
    required: false,
    default : ''
  },
  selectedOptions: {
    type: [String],
    required: false,
    default : []
  },
  questionType: {
    type: String,
    enum: [ 'SurveyMCQ' , 'SurveyInput' ,'SurveyParagraph' , 'SurveyNumber' ,'SurveyUrl' , 'SurveyPassword' , 'SurveyEmail' ],
    required: true,
  }
});
 
//--This is schema for a base result for a survey
const resultSchema = new mongoose.Schema({
  id: { 
    type: String,
    required: true
  },
  quizId: { 
    type: String,
    required: true
  },
  ip: { 
    type: String,
    required: false,
    default : ''
  },
  countryCode: { 
    type: String,
    required: false,
    default : ''
  },
  email: { 
    type: String,
    required: true,
  },
  userId: { 
    type: String,
    required: true
  },
  answers: {
  type: [answerSchema],
  required: true
  }
});




const SurveyResult = mongoose.model('SurveyResult', resultSchema, 'results');








////////////////////////////////////////////
module.exports = SurveyResult;

