
//--Require
require('dotenv').config();
const Survey = require("../models/survey/survey.js");
const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("../models/survey/svyQuestion.js");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");
const {ObjToSchema} = require('./schemaObj.js');

async function updateSurvey(req, res){
  // try {
    const incommingSurvey = req.body.survey; // the updated fields
    //---------------------------------------
    const questions = incommingSurvey.questions;
    const newQuestions = await ObjToSchema(questions)
      incommingSurvey.questions = newQuestions;
    
    //---------------------------------------
    const id = incommingSurvey._id; // the updated fields
//new :true to send the updated version
    const options = { new: true, upsert: true }; 
    const survey = await Survey.findByIdAndUpdate( id , incommingSurvey,options);

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
