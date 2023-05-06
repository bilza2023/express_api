const Svy = require('./getSurvey.js');
const baseInput = require('./getSurveyInput.js')
const baseMCQ = require('./getMCQ.js')



async function createBasicSvy(Survey,SurveyInput,SurveyMCQ) {
  let survey = new Survey( Svy );
  
  const mcq = new SurveyMCQ(baseMCQ);
  await mcq.save();
  survey.questions.push(mcq);
  //...
  const inpt = new SurveyInput( baseInput );
  inpt.save();
  survey.questions.push(inpt);

    await survey.save();
    // console.log("survey" , survey);
    // console.log("r" ,r );
    console.log("createBasicSvy: survey saved...");
}


module.exports = createBasicSvy;