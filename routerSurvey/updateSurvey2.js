
//--Require
require('dotenv').config();
const Survey = require("../models/survey/survey.js");
const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("../models/survey/svyQuestion.js");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

async function updateSurvey(req, res){
  // try {
    const incommingSurvey = req.body.survey; // the updated fields
    //---------------------------------------
    const questions = incommingSurvey.questions;
    const justSurvey = incommingSurvey;
    justSurvey.questions = [];
    const surveyPrep = new Survey( justSurvey );
    debugger;
    
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

            switch (question.backendType) {
              case "SurveyMCQ":
                const q = new SurveyMCQ(question);
                await q.save();
                surveyPrep.questions.push(q);
              break;
              case "SurveyInput":
                const inpt = new SurveyInput(question);
                await inpt.save();
                surveyPrep.questions.push(inpt);
              break;
              case "SurveyParagraph":
                const par = new SurveyParagraph(question);
                await par.save();
                surveyPrep.questions.push(par);
              break;
              case "SurveyEmail":
                const eml = new SurveyEmail(question);
                await eml.save();
                surveyPrep.questions.push(eml);
              break;
              case "SurveyPassword":
                const ps = new SurveyPassword(question);
                await ps.save();
                surveyPrep.questions.push(ps);
              break;
              case "SurveyUrl":
                const ur = new SurveyUrl(question);
                await ur.save();
                surveyPrep.questions.push(ur);
              break;

              case "SurveyNumber":
                const n = new SurveyNumber(question);
                await n.save();
                surveyPrep.questions.push(n);
              break;
            
              default:
              break;
            }
      
    }
  
    // await survey.save();
    //---------------------------------------
    const id = incommingSurvey._id; // the updated fields

    const options = { new: false, upsert: true }; 
    const survey = await Survey.findByIdAndUpdate( id , surveyPrep,options);

    if(survey){
      return res.status(200).json({ msg : "Survey Saved",survey });
    }else {
      return res.status(404).json({ msg : "Item not found" });
    }
       
  // } catch (error) {
  //   const r = await respFail(res,"failed to save","failedToSaveSurvey");
  //   return r;
  // }
}


module.exports = updateSurvey;
