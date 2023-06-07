
//--Require
require('dotenv').config();
const Survey = require("../../models/survey/survey.js");
const {SurveyMCQ , SurveyInput,SurveyParagraph,SurveyNumber,SurveyUrl,SurveyPassword,SurveyEmail} = require("../../models/survey/svyQuestion.js");
const respOk = require("../../common/respOk.js");
const respFail = require("../../common/respFail.js");
const {ObjToSchema} = require('../schemaObj.js');

async function update_save_fn(res,incommingSurvey){
  try {
    //---------------------------------------
    const options = { new: true, upsert: true }; 
    const survey = await Survey.findByIdAndUpdate( incommingSurvey._id , incommingSurvey,options);

    if(survey){
      return res.status(200).json({ msg : "Survey Saved",survey });
    }else {
      return res.status(404).json({ msg : "Item not found" });
    }
  } catch (error) {
      return res.status(500).json({ msg : "failed to save" });
    // const r = await respFail(res,"failed to save","failedToSaveSurvey");
    return r;
  }
}


module.exports = update_save_fn;

