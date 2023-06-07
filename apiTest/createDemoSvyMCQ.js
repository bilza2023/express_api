
const getSurvey = require('../models/newSvyData/getSurvey');
const baseMCQ = require  ('../models/newSvyData/getMCQ.js');
const Survey = require('../models/survey');
const {SurveyMCQ} = require('../models/svyQuestion');

async function createDemoSvyMCQ() {

 let survey = new Survey( getSurvey('64202224fd8518cb214bd138' , "MCQ") );

    
    const q = new SurveyMCQ(baseMCQ);
    await q.save();
  survey.questions.push(q);
  
/////////////////////////////////////////////////////////////

    await survey.save();
    console.log("createBasicSvy: survey saved...");
}


module.exports = createDemoSvyMCQ;

