This is the error i am getting in my node mongoose app
MongoDb ===> connection established
Tue, 06 Jun 2023 23:48:43 GMT uncaughtException: Cannot read properties of undefined (reading 'findById')
TypeError: Cannot read properties of undefined (reading 'findById')
    at createResponses (C:\expressApi\apiTest\createResponses.js:7:8)
    at NativeConnection.<anonymous> (C:\expressApi\api.js:21:5)
    at Object.onceWrapper (node:events:627:28)
    at NativeConnection.emit (node:events:513:28)
    at Connection.onOpen (C:\expressApi\node_modules\mongoose\lib\connection.js:650:8)  
    at _setClient (C:\expressApi\node_modules\mongoose\lib\connection.js:932:8)
    at _createMongoClient (C:\expressApi\node_modules\mongoose\lib\connection.js:861:3) 
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)       
    at async NativeConnection.openUri (C:\expressApi\node_modules\mongoose\lib\connection.js:728:5)

Here is the code

//--The project files has all the data where as all the models are send by api.js
const Survey = require("../models/survey"); 
 
 
async function createResponses(Survey) {

Survey.findById('64784f0081e7c8b4afe7a310', function (err, survey) {
  if (err) return handleError(err);
  console.log("survey", survey);
});
//--64202224fd8518cb214bd138 this is userId remains the same
//  let survey = new Survey( getSurvey('64202224fd8518cb214bd138' , "New Karachi") );

//                 const caseSurveyMCQ = new SurveyMCQ(getDataMCQ());
//                 await caseSurveyMCQ.save();
//                 survey.questions.push(caseSurveyMCQ);
              
    // await survey.save();
    console.log("createResponses...");
}


module.exports = createResponses;





and here is the Survey model
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
const Survey = mongoose.model('Survey', SurveySchema,  'surveys');

module.exports = Survey;

