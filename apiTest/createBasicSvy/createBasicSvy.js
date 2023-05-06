const Svy = require('./getSurvey.js');
const baseMCQ = require('./getMCQ.js')
const baseInput = require('./getSurveyInput.js')
const baseParagraph = require('./getSurveyParagraph.js')
const baseEmail = require('./getSurveyEmail.js')
const basePassword = require('./getSurveyPassword.js')
const baseUrl = require('./getSurveyUrl.js')
const baseNumber = require('./getSurveyNumber.js')



async function createBasicSvy(Survey,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail) {
debugger;
  let survey = new Survey( Svy );
  
  const mcq = new SurveyMCQ(baseMCQ);
  await mcq.save();
  survey.questions.push(mcq);
  //...
  const inpt = new SurveyInput( baseInput );
  inpt.save();
  survey.questions.push(inpt);
  //...
  const para = new SurveyParagraph( baseParagraph );
  para.save();
  survey.questions.push(para);
  //...
  const no = new SurveyNumber( baseNumber );
  no.save();
  survey.questions.push(no);
  //...
  const eml = new SurveyEmail( baseEmail );
  eml.save();
  survey.questions.push(eml);
  //...
  const pass = new SurveyPassword( basePassword );
  pass.save();
  survey.questions.push(pass);
  //...
  const ur = new SurveyUrl( baseUrl );
  ur.save();
  survey.questions.push(ur);



/////////////////////////////////////////////////////////////
    await survey.save();
    // console.log("survey" , survey);
    // console.log("r" ,r );
    console.log("createBasicSvy: survey saved...");
}


module.exports = createBasicSvy;