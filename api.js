require('dotenv').config();
const db = require("./mongoDb/mongo.js");

// const createBasicSvy=require('./apiTest/createBasicSvy.js');
const manualSurvey=require('./apiTest/manualSurvey/manualSurvey.js');
// const createResponses=require('./apiTest/createResponses/createResponses.js');
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
    manualSurvey();
    // createDemoSvyMCQ();
    // deleteAllSurveys(Survey);
    // createResult();
    // deleteAllResults();
});


