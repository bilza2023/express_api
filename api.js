require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const basicTagTest = require('./apiTester/basicTagTest.js');

db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    console.log("api Tester===>>");
    //////////////////////////////////////////////////////
    // createBasicSvy("Gijga Baby");
    // createResponses();
    // manualSurvey();
    // createNewTemplate();
    async function run(){
    await basicTagTest();
    }
    // createDemoSvyMCQ();
    // deleteAllSurveys(Survey);
    // createResult();
    // deleteAllResults();
    run();
});


