
//--Require
require('dotenv').config();
const Survey = require("../models/survey/survey.js");
const respOk = require("../common/respOk");
const respFail = require("../common/respFail");

async function updateSurvey(req, res){
  try {
    const incommingSurvey = req.body.survey; // the updated fields
    const id = incommingSurvey._id; // the updated fields

    const options = { new: true, upsert: true }; 
    const survey = await Survey.findByIdAndUpdate( id , incommingSurvey,options);

    return res.status(200).json({ msg : "Survey Saved",survey });
       
  } catch (error) {
    const r = await respFail(res,"failed to save","failedToSaveSurvey");
    return r;
  }
}


module.exports = updateSurvey;
