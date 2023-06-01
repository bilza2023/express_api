//--The project files has all the data where as all the models are send by api.js
const getSurvey = require('../projectFiles/newSurvey/getSurvey');
const baseMCQ = require('../projectFiles/newSurvey/getMCQ.js');
const baseInput = require('../projectFiles/newSurvey/getSurveyInput.js');
const baseParagraph = require('../projectFiles/newSurvey/getSurveyParagraph.js');
const baseEmail = require('../projectFiles/newSurvey/getSurveyEmail.js');
const basePassword = require('../projectFiles/newSurvey/getSurveyPassword.js');
const baseUrl = require('../projectFiles/newSurvey/getSurveyUrl.js');
const baseNumber = require('../projectFiles/newSurvey/getSurveyNumber.js');
 

async function createBasicSvy(Survey,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail) {

//--64202224fd8518cb214bd138 this is userId remains the same
 let survey = new Survey( getSurvey('64202224fd8518cb214bd138' , "Test...") );

                const caseSurveyMCQ = new SurveyMCQ(baseMCQ);
                await caseSurveyMCQ.save();
                survey.questions.push(caseSurveyMCQ);
              ///
              
                const caseSurveyInput = new SurveyInput(baseInput);
                await caseSurveyInput.save();
                survey.questions.push(caseSurveyInput);
              ////
              
                const caseSurveyParagraph = new SurveyParagraph(baseParagraph);
                await caseSurveyParagraph.save();
                survey.questions.push(caseSurveyParagraph);
              ///
              
                const caseSurveyEmail = new SurveyEmail(baseEmail);
                await caseSurveyEmail.save();
                survey.questions.push(caseSurveyEmail);
              //

                const caseSurveyPassword = new SurveyPassword(basePassword);
                await caseSurveyPassword.save();
                survey.questions.push(caseSurveyPassword);
              
              
                const caseSurveyUrl = new SurveyUrl(baseUrl);
                await caseSurveyUrl.save();
                survey.questions.push(caseSurveyUrl);
              //

              
                const caseSurveyNumber = new SurveyNumber(baseNumber);
                await caseSurveyNumber.save();
                survey.questions.push(caseSurveyNumber);
              //
      
  
    await survey.save();
    console.log("createBasicSvy: survey saved...");
}


module.exports = createBasicSvy;

