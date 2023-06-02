//--The project files has all the data where as all the models are send by api.js
 
const {getSurvey ,qDataMCQ,qDataInput,qDataParagraph,qDataEmail,qDataPassword,qDataUrl,qDataNumber} = require('../models/questionTypesData.js');
 

async function createBasicSvy(Survey,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail) {

//--64202224fd8518cb214bd138 this is userId remains the same
 let survey = new Survey( getSurvey('64202224fd8518cb214bd138' , "Test...") );

                const caseSurveyMCQ = new SurveyMCQ(qDataMCQ);
                await caseSurveyMCQ.save();
                survey.questions.push(caseSurveyMCQ);
              ///
              
                const caseSurveyInput = new SurveyInput(qDataInput);
                await caseSurveyInput.save();
                survey.questions.push(caseSurveyInput);
              ////
              
                const caseSurveyParagraph = new SurveyParagraph(qDataParagraph);
                await caseSurveyParagraph.save();
                survey.questions.push(caseSurveyParagraph);
              ///
              
                const caseSurveyEmail = new SurveyEmail(qDataEmail);
                await caseSurveyEmail.save();
                survey.questions.push(caseSurveyEmail);
              //

                const caseSurveyPassword = new SurveyPassword(qDataPassword);
                await caseSurveyPassword.save();
                survey.questions.push(caseSurveyPassword);
              
              
                const caseSurveyUrl = new SurveyUrl(qDataUrl);
                await caseSurveyUrl.save();
                survey.questions.push(caseSurveyUrl);
              //

              
                const caseSurveyNumber = new SurveyNumber(qDataNumber);
                await caseSurveyNumber.save();
                survey.questions.push(caseSurveyNumber);
              //
      
  
    await survey.save();
    console.log("createBasicSvy: survey saved...");
}


module.exports = createBasicSvy;

