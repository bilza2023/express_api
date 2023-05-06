const Svy = require('./getSurvey.js');
const baseMCQ = require('./getMCQ.js')
const baseInput = require('./getSurveyInput.js')
const baseParagraph = require('./getSurveyParagraph.js')
const baseEmail = require('./getSurveyEmail.js')
const basePassword = require('./getSurveyPassword.js')
const baseUrl = require('./getSurveyUrl.js')
const baseNumber = require('./getSurveyNumber.js')



async function createBasicSvy(Survey,SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail) {
// debugger;
  let questions =[];
  // const mcq = new SurveyMCQ(baseMCQ);
  // await mcq.save();
  questions.push(baseMCQ);
  questions.push(baseInput);
  questions.push(baseParagraph);
  questions.push(baseNumber);
  questions.push(baseEmail);
  questions.push(basePassword);
  questions.push( baseUrl  );

/////////////////////////////////////////////////////////////
 let survey = new Survey( Svy );

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

            switch (question.backendType) {
              case "SurveyMCQ":
                const q = new SurveyMCQ(question);
                await q.save();
                survey.questions.push(q);
              break;
              case "SurveyInput":
                const inpt = new SurveyInput(question);
                await inpt.save();
                survey.questions.push(inpt);
              break;
              case "SurveyParagraph":
                const par = new SurveyParagraph(question);
                await par.save();
                survey.questions.push(par);
              break;
              case "SurveyEmail":
                const eml = new SurveyEmail(question);
                await eml.save();
                survey.questions.push(eml);
              break;
              case "SurveyPassword":
                const ps = new SurveyPassword(question);
                await ps.save();
                survey.questions.push(ps);
              break;
              case "SurveyUrl":
                const ur = new SurveyUrl(question);
                await ur.save();
                survey.questions.push(ur);
              break;

              case "SurveyNumber":
                const n = new SurveyNumber(question);
                await n.save();
                survey.questions.push(n);
              break;
            
              default:
              break;
            }
      
    }
  
    await survey.save();
    console.log("createBasicSvy: survey saved...");
}


module.exports = createBasicSvy;

