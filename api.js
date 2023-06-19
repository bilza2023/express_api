require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const data = require('./apiTest/first_quiz.js');
// const createBasicSvy=require('./apiTest/createBasicSvy.js');
// const manualSurvey=require('./apiTest/manualSurvey/manualSurvey.js');
const addQuestionsToQuiz = require('./apiTest/addQuestionsToQuiz.js');
// const createResponses=require('./apiTest/createResponses/createResponses.js');
// const createNewTemplate=require('./apiTest/template/createNew.js');
// const createResult=require('./apiTest/createResult.js');
// const deleteAllSurveys = require('./apiTest/deleteAllSurveys.js');
// const deleteAllResults = require('./apiTest/deleteAllResults.js');
// const createDemoSvyMCQ = require('./apiTest/createDemoSvyMCQ.js');
//////////////////////////////////////////////////////

console.log("api test");
db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    //////////////////////////////////////////////////////
    // createBasicSvy("Gijga Baby");
    // createResponses();
    // manualSurvey();
    // createNewTemplate();
    addQuestionsToQuiz( '6490b4b1f328b6b4408dc1f0',data);
    // createDemoSvyMCQ();
    // deleteAllSurveys(Survey);
    // createResult();
    // deleteAllResults();
});


