require('dotenv').config();
const db = require("./mongoDb/mongo.js");
//////---survey section--
const Survey = require("./models/survey.js");
const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("./models/svyQuestion.js");
///--survey related fn
const createBasicSvy=require('./apiTest/createBasicSvy.js');
const createResult=require('./apiTest/createResult.js');
//--example  : createBasicSvy(Survey,SurveyInput,SurveyMCQ);
const deleteAllSurveys = require('./apiTest/deleteAllSurveys.js');
const deleteAllResults = require('./apiTest/deleteAllResults.js');
const createDemoSvyMCQ = require('./apiTest/createDemoSvyMCQ.js');
//////////////////////////////////////////////////////

console.log("api test");
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    createBasicSvy(Survey,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail);
    // createDemoSvyMCQ(Survey,SurveyMCQ);
    // deleteAllSurveys(Survey);
    // createResult();
    // deleteAllResults();
});


