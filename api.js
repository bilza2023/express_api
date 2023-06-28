require('dotenv').config();
const db = require("./mongoDb/mongo.js");
const basicTagTest = require('./apiTester/basicTagTest.js');

db.once('open',()=> {
    console.log("MongoDb ===> connection established");
    console.log("api Tester===>>");
    debugger;
    //////////////////////////////////////////////////////
    // createBasicSvy("Gijga Baby");
    // createResponses();
    // manualSurvey();
    // createNewTemplate();
    async function run(){
    await basicTagTest();
    console.log("api Tester Ended..===>>");
    }
    // createDemoSvyMCQ();
    // deleteAllSurveys(Survey);
    // createResult();
    // deleteAllResults();
    run();
});


