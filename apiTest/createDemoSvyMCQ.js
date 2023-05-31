
const getSurvey = require('../projectFiles/newSurvey/getSurvey');
const Survey = require('../models/survey/survey');
const baseMCQ = require('../projectFiles/newSurvey/getMCQ.js');
const {SurveyMCQ} = require('../models/survey/svyQuestion');

async function createDemoSvyMCQ() {

 let survey = new Survey( getSurvey('64202224fd8518cb214bd138' , "Test...") );

    
    const q = new SurveyMCQ(baseMCQ);
    await q.save();
  survey.questions.push(q);
  
/////////////////////////////////////////////////////////////

    await survey.save();
    console.log("createBasicSvy: survey saved...");
}


module.exports = createDemoSvyMCQ;

